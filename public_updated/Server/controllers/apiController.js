const fs = require('fs')
const { PDFDocument, rgb } = require('pdf-lib');
const { default: axios } = require("axios");
const PDF = require('../models/pdf');
const { default: mongoose } = require('mongoose');
const { log } = require('console');
const User = require('../models/User');
const stripe = require('stripe')(process.env.stripe);

const testAPI = async (req, res) => {

    res.status(200).json({ message: 'All servers are running well' });

};

const generateEbook = async (req, res) => {
    const { number_of_subtopics, topic, email, output_language } = req.body

 
    let include_images = false;
    let count = User.findOne({ email: email })
    try {

        const subtopicsArray = await generateSubtopics(number_of_subtopics, output_language, topic);
        const files = await generateContent(subtopicsArray, number_of_subtopics, include_images)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=preview.pdf');
        await savePDFToDatabase(files, `Ebook on ${topic} with ${number_of_subtopics} subtopics`, email)
        User.findOneAndUpdate({ email: email }, { $set: { noOfDownloadedEbooks: noOfDownloadedEbooks + 1 } })
        res.json({ message: 'Ebook uploaded' });
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}

const generateContent = async (subtopics_array, include_images) => {
    const subtopicsArray = subtopics_array.split(',');
    let pdfData = [];
    let imageArray = [];
    let count = 0;
    for (const subtopic of subtopicsArray) {
        const message = `Please write summary about ${subtopic}`;
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [{ role: 'assistant', content: message }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.apiKey}`
                }
            });
            const txt = response.data.choices[0].message.content + '\n\n';
            
            pdfData.push(txt)
            
            count++;
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('An error occurred.');
            return;
        }
    }
    const pdfDataMerge = await createPdfFromArrays(subtopicsArray, pdfData, imageArray)
    return pdfDataMerge;
}


async function createPdfFromArrays(topics, content, imageArray) {
    try {
        const pdfDoc = await PDFDocument.create();

        for (let i = 0; i < Math.min(topics.length, content.length); i++) {
            const page = pdfDoc.addPage();
            const topic = topics[i];
            const contentText = content[i];

            const margin = 50;
            const pageHeight = page.getSize().height;

            const topicHeight = 18;
            const contentHeight = 12;

            page.drawText(topic, {
                x: margin,
                y: pageHeight - margin - topicHeight,
                size: topicHeight,
                color: rgb(0, 0, 0),
            });
            if (imageArray[i]) {
                const imageBytes = await fetch(imageArray[i]).then(response => response.arrayBuffer());
                const image = await pdfDoc.embedPng(imageBytes);
                page.drawImage(image, {
                    x: margin,
                    y: pageHeight - margin - topicHeight - contentHeight - 100, // Adjust for image height and spacing
                    width: 100,
                    height: 100,
                    align: 'center'
                });

            }

            page.drawText(contentText, {
                x: margin,
                y: pageHeight - margin - topicHeight - contentHeight - 120, // Adjust for spacing
                size: contentHeight,
                color: rgb(0, 0, 0),
                maxWidth: page.getSize().width - margin - 20
            });
        }

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    } catch (error) {
        console.log(error);
    }


}
const generateSubtopics = async (number_of_subtopics, output_language, topic) => {
    try {
        console.log(output_language);
        const message = `Please generate ${number_of_subtopics} subtopics about ${topic} and seperate by comma. The subtopics must not have any details. Please do all this in the language ${output_language}. Please make sure there are no double quotations anywhere.`;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.apiKey}`
            }
        });

        const subtopics = response.data.choices[0].message.content;
        const subtopicsArray = subtopics.split(') ').map(subtopic => subtopic.trim());

        return subtopicsArray[0];
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function savePDFToDatabase(pdfBuffer, pdfName, email) {
    try {
        const newPDF = new PDF({
            name: pdfName,
            pdfData: pdfBuffer,
            generated: email
        });

        await newPDF.save();

        console.log('PDF saved in database');
    } catch (error) {
        console.error('Error saving PDF to database:', error);
    }
}

const getUserPdfs = async (req, res) => {

    const { email } = req.body
    try {
        const userPDFs = await UserPDFs(email);
        res.setHeader('Content-Type', 'application/json');
        res.send(userPDFs)

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function UserPDFs(email) {
    try {

        const userPDFs = await PDF.find({ generated: email });
        return userPDFs.map((pdf) => ({
            id: pdf.id,
            name: pdf.name,
            pdfData: Buffer.from(pdf.pdfData),
        }));
    } catch (error) {
        console.error('Error fetching user PDFs:', error);
        throw error;
    }
}

const PaymentSchema = new mongoose.Schema({
    amount: Number,
    date: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', PaymentSchema);
const getSubscription = async (req, res) => {
    try {
        const { amount, paymentMethodId } = req.body;

        // Create a payment intent using the Stripe API
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert amount to cents
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
        });

        if (paymentIntent.status === 'succeeded') {
            const payment = new Payment({ amount });
            await payment.save();
            res.status(201).json({ message: 'Payment saved and succeeded' });
        } else if (paymentIntent.status === 'requires_action') {
            // Payment requires action, handle further action here
            res.status(200).json({ requiresAction: true, clientSecret: paymentIntent.client_secret });
        } else {
            res.status(500).json({ message: 'Payment processing failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing payment' });
    }
}

const getpdf = async (req, res) => {
    const { id } = req.body
    try {
        console.log(id);
        const userPDFs = await PDF.findOne({ _id: id });

        res.setHeader('Content-Disposition', 'attachment; filename=sample.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        console.log(userPDFs);
        res.end(Buffer.from(userPDFs.pdfData))

    } catch (error) {
        console.error('Error fetching user PDFs:', error);
        throw error;
    }
}

module.exports = { testAPI, generateEbook, getUserPdfs, getpdf, getSubscription }
