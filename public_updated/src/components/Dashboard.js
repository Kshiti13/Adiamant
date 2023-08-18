import React, { useEffect, useState } from 'react';
import BookTable from './BookTable';
import Footer from './Footer';
import ProgressIndicator from './ProgressIndicator';

const Dashboard = ({ data }) => {
    const [formData, setFormData] = useState({
        flashcards: '',
        topic: '',
        numOfSubtopics: 0,
    });
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [loading, setLoading] = useState(false);
    const [bookData, setBookData] = useState([]);
    let email = data.data.user.email;

    const generateBook = async (e) => {
        console.log(email, '------', selectedLanguage)
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://adiamant-server-production.up.railway.app/api/generateEbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "number_of_subtopics": formData.numOfSubtopics,
                    "topic": formData.topic,
                    "email": email,
                    "output_language": selectedLanguage,
                }),
            });
            console.log(response);
            if (response.ok) {
                setLoading(false);
            } else {
                alert('Something went wrong !! Please try again');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
            setLoading(false);
        }
    };

    const getBooks = async () => {
        try {
            const response = await fetch('https://adiamant-server-production.up.railway.app/api/getUserPdfs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (response.ok) {
                let data = await response.json();
                console.log(data);
                setBookData([...data]);
            } else {
                alert('Something went wrong !! Please try again');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        generateBook(event);
    };

    useEffect(() => {
        getBooks();
    }, [loading]);

    return (
        <div className=" m-48 mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Enter Topic and Number of Subtopics</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label htmlFor="flashcards" className="block text-gray-700 font-medium">
                    Create Type:
                    </label>
                    <select
                        id="flashcards"
                        name="flashcards"
                        value={formData.flashcards}
                        onChange={handleInputChange}
                        className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    
                        <option value="ebook" selected={true}>EBook</option>
                        <option value="flashcards">FlashCards</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-gray-700 font-medium">
                        Topic:
                    </label>
                    <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    
                        <option value="">Select a Topic</option>
                        <optgroup label="Artificial Intelligence (AI)">
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Artificial Neural Networks">Artificial Neural Networks</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="Reinforcement Learning">Reinforcement Learning</option>
                        <option value="Supervised Learning">Supervised Learning</option>
                        <option value="Unsupervised Learning">Unsupervised Learning</option>
                        <option value="Transfer Learning">Transfer Learning</option>
                        <option value="Neural Network Architectures">Neural Network Architectures</option>
                        <option value="Generative AI">Generative AI</option>
                        <option value="ChatGPT">ChatGPT</option>
                    </optgroup>
                    <optgroup label="Data Science and Analytics">
                    	<option value="Big Data">Big Data</option>
                    	<option value="Data Analysis">Data Analysis</option>
                    	<option value="Data Compression">Data Compression</option>
                    	<option value="Data Engineering">Data Engineering</option>
                    	<option value="Data Integration">Data Integration</option>
                    	<option value="Data Mining">Data Mining</option>
                    	<option value="Data Preprocessing">Data Preprocessing</option>
                    	<option value="Data Visualization">Data Visualization</option>
                    	<option value="Data Warehousing">Data Warehousing</option>
                    	<option value="Feature Extraction">Feature Extraction</option>
                    	<option value="Image Processing">Image Processing</option>
                    	<option value="Information Retrieval">Information Retrieval</option>
                    	<option value="Knowledge Management">Knowledge Management</option>
                    	<option value="Machine Learning">Machine Learning</option>
                    	<option value="Model Evaluation">Model Evaluation</option>
                    	<option value="Natural Language Processing">Natural Language Processing</option>
                    	<option value="Pattern Recognition">Pattern Recognition</option>
                    	<option value="Semantic Web">Semantic Web</option>
                    </optgroup>
                    <optgroup label="Blockchain and Cryptocurrency">
                    	<option value="Blockchain Analytics Tools">Blockchain Analytics Tools</option>
                    	<option value="Blockchain Development Frameworks">Blockchain Development Frameworks</option>
                    	<option value="Blockchain Explorer">Blockchain Explorer</option>
                    	<option value="Blockchain Intermediaries">Blockchain Intermediaries</option>
                    	<option value="Blockchain Mining">Blockchain Mining</option>
                    	<option value="Blockchain Security">Blockchain Security</option>
                    	<option value="Blockchain Security Tools">Blockchain Security Tools</option>
                    	<option value="Blockchain Technology">Blockchain Technology</option>
                    	<option value="Cryptocurrency">Cryptocurrency</option>
                    	<option value="Cryptographic Hash Functions">Cryptographic Hash Functions</option>
                    	<option value="DAO (Decentralized Autonomous Organization) Platforms">DAO (Decentralized Autonomous Organization) Platforms</option>
                    	<option value="Permissioned Blockchain">Permissioned Blockchain</option>
                    	<option value="Permissionless Blockchains">Permissionless Blockchains</option>
                    	<option value="Private Blockchain">Private Blockchain</option>
                    	<option value="Public Blockchain">Public Blockchain</option>
                    	<option value="Smart Contracts">Smart Contracts</option>
                    	<option value="Tokenization">Tokenization</option>
                    	<option value="Zero-Knowledge Proofs (ZKP)">Zero-Knowledge Proofs (ZKP)</option>
                    </optgroup>
                    <optgroup label="Cybersecurity and Ethical Hacking">
                    	<option value="AI Ethics">Cybersecurity</option>
						<option value="Cybersecurity">AI Ethics</option>
                    	<option value="Ethical Hacking">Ethical Hacking</option>
                    	<option value="Exploitation">Exploitation</option>
                    	<option value="Incident Response">Incident Response</option>
                    	<option value="Information Security">Information Security</option>
                    	<option value="Intrusion Detection System (IDS) ">Intrusion Detection System (IDS) </option>
                    	<option value="Intrusion Prevention System (IPS)">Intrusion Prevention System (IPS)</option>
                    	<option value="Malware Analysis">Malware Analysis</option>
                    	<option value="Password Cracking">Password Cracking</option>
                    	<option value="Physical Security Testing">Physical Security Testing</option>
                    	<option value="Privacy-enhancing Technologies">Privacy-enhancing Technologies</option>
                    	<option value="Secure Coding Practices">Secure Coding Practices</option>
                    	<option value="Social Engineering">Social Engineering</option>
                    	<option value="Vulnerability Exploitation">Vulnerability Exploitation</option>
                    	<option value="Zero Trust Architecture">Zero Trust Architecture</option>
                    </optgroup>
                    <optgroup label="Cloud Computing and Virtualization">
						<option value="Cloud Computing">Cloud Computing</option>
                    	<option value="E-commerce">E-commerce</option>
                    	<option value="Hybrid Cloud">Hybrid Cloud</option>
                    	<option value="Infrastructure as a Service (IaaS)">Infrastructure as a Service (IaaS)</option>
                    	<option value="Private Cloud">Private Cloud</option>
                    	<option value="Public Cloud">Public Cloud</option>
                    	<option value="Scalability">Scalability</option>
                    	<option value="Scalability Solutions">Scalability Solutions</option>
                    	<option value="Serverless Computing">Serverless Computing</option>
                    	<option value="Virtualization">Virtualization</option>
                    </optgroup>
                    <optgroup label="Internet of Things (IoT)">Internet of Things (IoT)">
                    	<option value="Digital Identity">Digital Identity</option>
                    	<option value="Digital Identity Solutions">Digital Identity Solutions</option>
                    	<option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
                    	<option value="Mobile App Development">Mobile App Development</option>
                    	<option value="Mobile Security">Mobile Security</option>
                    	<option value="Multisig Wallets">Multisig Wallets</option>
                    	<option value="Privacy-enhancing Technologies">Privacy-enhancing Technologies</option>
                    	<option value="Smart Contracts">Smart Contracts</option>
                    	<option value="Wireless Communication">Wireless Communication</option>
                    	<option value="Wireless Hacking">Wireless Hacking</option>
                    	<option value="Wireless Networks">Wireless Networks</option>
                    </optgroup>
                    <optgroup label="DevOps">
						<option value="DevOps">DevOps</option>
                    	<option value="DevOps Collaboration and Communication">DevOps Collaboration and Communication</option>
                    	<option value="Continuous Integration (CI)">Continuous Integration (CI)</option>
                    	<option value="Continuous Delivery/Deployment (CD)">Continuous Delivery/Deployment (CD)</option>
                    	<option value="Infrastructure as Code (IaC)">Infrastructure as Code (IaC)</option>
                    	<option value="Configuration Management">Configuration Management</option>
                    	<option value="Version Control Systems">Version Control Systems</option>
                    	<option value="Continuous Monitoring">Continuous Monitoring</option>
                    	<option value="Containerization and Orchestration">Containerization and Orchestration</option>
                    	<option value="Microservices">Microservices</option>
                    	<option value="DevOps Security and Compliance">DevOps Security and Compliance</option>
                    	<option value="Test Automation">Test Automation</option>
                    	<option value="GitOps">GitOps</option>
                    </optgroup>
                    <optgroup label="Software Development and Engineering">
                    	<option value="Computer Aided Design (CAD)">Computer Aided Design (CAD)</option>
                    	<option value="Computer Graphics">Computer Graphics</option>
                    	<option value="Computer Networks">Computer Networks</option>
                    	<option value="Distributed Systems">Distributed Systems</option>
                    	<option value="Operating Systems">Operating Systems</option>
                    	<option value="Parallel Computing">Parallel Computing</option>
                    	<option value="Parallel Programming">Parallel Programming</option>
                    	<option value="Software Architecture">Software Architecture</option>
                    	<option value="Software Engineering">Software Engineering</option>
                    	<option value="Software Quality Assurance">Software Quality Assurance</option>
                    	<option value="Software Testing">Software Testing</option>
                    </optgroup>
                    <optgroup label="Automation and Workflow">
                    	<option value="Business Process Automation">Business Process Automation</option>
                    	<option value="Intelligent Automation">Intelligent Automation</option>
                    	<option value="Process Automation">Process Automation</option>
                    	<option value="Process Discovery">Process Discovery</option>
                    	<option value="Task Automation">Task Automation</option>
                    	<option value="Workflow Automation">Workflow Automation</option>
                    </optgroup>
                    <optgroup label="Language and Multimedia Technologies">
                    	<option value="Natural Language Understanding (NLU)">Natural Language Understanding (NLU)</option>
                    	<option value="Speech Recognition">Speech Recognition</option>
                    	<option value="Speech Synthesis">Speech Synthesis</option>
                    	<option value="Computer Vision Applications ">Computer Vision Applications </option>
                    	<option value="Video Processing">Video Processing</option>
                    	<option value="Audio Processing">Audio Processing</option>
                    </optgroup>
                    <optgroup label="Computer Science and Ethics">
                    	<option value="Computer Networks">Computer Networks</option>
                    	<option value="Operating Systems">Operating Systems</option>
                    	<option value="Algorithms and Data Structures">Algorithms and Data Structures</option>
                    	<option value="Cryptography">Cryptography</option>
                    	<option value="Machine Ethics">Machine Ethics</option>
                    	<option value="Cybersecurity Ethics">Cybersecurity Ethics</option>
                    	<option value="Privacy Regulations">Privacy Regulations</option>
                    	<option value="Artificial General Intelligence (AGI)">Artificial General Intelligence (AGI)</option>
                    	<option value="Ethical Implications of AI">Ethical Implications of AI</option>
                    </optgroup>
                    <optgroup label="Data Communication and Networking">
                    	<option value="Internet Protocols ">Internet Protocols </option>
                    	<option value="Network Security Protocols ">Network Security Protocols </option>
                    	<option value="Network Architecture ">Network Architecture </option>
                    	<option value="Software-Defined Networking (SDN)">Software-Defined Networking (SDN)</option>
                    	<option value="Wireless Networking Standards ">Wireless Networking Standards </option>
                    </optgroup>
                    <optgroup label="Security and Privacy">
                    	<option value="Threat Modeling">Threat Modeling</option>
                    	<option value="Data Privacy Regulations ">Data Privacy Regulations </option>
                    	<option value="Security Frameworks ">Security Frameworks </option>
                    	<option value="Security Incident Response">Security Incident Response</option>
                    	<option value="Security Information and Event Management (SIEM)">Security Information and Event Management (SIEM)</option>
                    	<option value="Anonymization Techniques">Anonymization Techniques</option>
                    	<option value="Differential Privacy">Differential Privacy</option>
                    </optgroup>
                    <optgroup label="Blockchain and Consensus">
                    	<option value="Distributed Ledger Technology (DLT)">Distributed Ledger Technology (DLT)</option>
                    	<option value="Smart Contract Platforms ">Smart Contract Platforms </option>
                    	<option value="Proof of Work (PoW)">Proof of Work (PoW)</option>
                    	<option value="Proof of Stake (PoS)">Proof of Stake (PoS)</option>
                    	<option value="Delegated Proof of Stake (DPoS)">Delegated Proof of Stake (DPoS)</option>
                    	<option value="Byzantine Fault Tolerance (BFT)">Byzantine Fault Tolerance (BFT)</option>
                    	<option value="Sharding">Sharding</option>
                    	<option value="Interoperability Protocols ">Interoperability Protocols </option>
                    </optgroup>
                    <optgroup label="Other Concepts">
                    	<option value="Cloud Computing Architectures ">Cloud Computing Architectures </option>
                    	<option value="Big Data Analytics">Big Data Analytics</option>
                    	<option value="Edge Computing">Edge Computing</option>
                    	<option value="Quantum Computing">Quantum Computing</option>
                    	<option value="Cyber-Physical Systems">Cyber-Physical Systems</option>
                    	<option value="Internet of Things (IoT) Applications">Internet of Things (IoT) Applications</option>
                    	<option value="Data Science Methodologies">Data Science Methodologies</option>
                    	<option value="Explainable AI (XAI)">Explainable AI (XAI)</option>
                    	<option value="Federated Learning">Federated Learning</option>
                    </optgroup>
                    <optgroup label="Data Management">
                    	<option value="Database Management Systems (DBMS)">Database Management Systems (DBMS)</option>
                    	<option value="Data Governance">Data Governance</option>
                    	<option value="Data Privacy">Data Privacy</option>
                    	<option value="Data Storage Solutions">Data Storage Solutions</option>
                    	<option value="Data Migration">Data Migration</option>
                    	<option value="Data Backup and Recovery">Data Backup and Recovery</option>
                    	<option value="Data Catalogs">Data Catalogs</option>
                    	<option value="Data Cleaning">Data Cleaning</option>
                    	<option value="Data Virtualization">Data Virtualization</option>
                    	<option value="Data Replication">Data Replication</option>
                    </optgroup>
                    <optgroup label="Cloud Services">
                    	<option value="Platform as a Service (PaaS)">Platform as a Service (PaaS)</option>
                    	<option value="Software as a Service (SaaS)">Software as a Service (SaaS)</option>
                    	<option value="Infrastructure as a Service (IaaS)">Infrastructure as a Service (IaaS)</option>
                    	<option value="Serverless Computing">Serverless Computing</option>
                    	<option value="Cloud Storage Solutions">Cloud Storage Solutions</option>
                    	<option value="Cloud Computing Architectures">Cloud Computing Architectures</option>
                    	<option value="Cloud Security">Cloud Security</option>
                    	<option value="Cloud Migration Tools">Cloud Migration Tools</option>
                    	<option value="Cloud Orchestration">Cloud Orchestration</option>
                    </optgroup>
                    <optgroup label="Networking and Infrastructure">
                    	<option value="Network Security">Network Security</option>
                    	<option value="Network Monitoring">Network Monitoring</option>
                    	<option value="Network Protocols">Network Protocols</option>
                    	<option value="Network Virtualization">Network Virtualization</option>
                    	<option value="Software-Defined Networking (SDN)">Software-Defined Networking (SDN)</option>
                    	<option value="Wireless Networking">Wireless Networking</option>
                    	<option value="Network Load Balancing">Network Load Balancing</option>
                    	<option value="Network Performance Optimization">Network Performance Optimization</option>
                    	<option value="Network Firewalls">Network Firewalls</option>
                    	<option value="Network Intrusion Detection and Prevention">Network Intrusion Detection and Prevention</option>
                    </optgroup>
                    <optgroup label="Web Development">
                    	<option value="Front-end Development">Front-end Development</option>
                    	<option value="Back-end Development">Back-end Development</option>
                    	<option value="Full-stack Development">Full-stack Development</option>
                    	<option value="Web Design Principles">Web Design Principles</option>
                    	<option value="Content Management Systems (CMS)">Content Management Systems (CMS)</option>
                    	<option value="Web Frameworks">Web Frameworks</option>
                    	<option value="Web Accessibility">Web Accessibility</option>
                    	<option value="Responsive Web Design">Responsive Web Design</option>
                    	<option value="Web Analytics">Web Analytics</option>
                    	<option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                    </optgroup>
                    <optgroup label="IT Project Management">
                    	<option value="Agile Methodologies">Agile Methodologies</option>
                    	<option value="Waterfall Methodology">Waterfall Methodology</option>
                    	<option value="Scrum">Scrum</option>
                    	<option value="Kanban">Kanban</option>
                    	<option value="Project Management Tools">Project Management Tools</option>
                    	<option value="Risk Management">Risk Management</option>
                    	<option value="Change Management">Change Management</option>
                    	<option value="IT Governance">IT Governance</option>
                    	<option value="IT Service Management (ITSM)">IT Service Management (ITSM)</option>
                    	<option value="ITIL (Information Technology Infrastructure Library)">ITIL (Information Technology Infrastructure Library)</option>
                    </optgroup>
                    <optgroup label="Enterprise Systems">
                    	<option value="Enterprise Resource Planning (ERP) Systems">Enterprise Resource Planning (ERP) Systems</option>
                    	<option value="Customer Relationship Management (CRM) Systems">Customer Relationship Management (CRM) Systems</option>
                    	<option value="Supply Chain Management (SCM) Systems">Supply Chain Management (SCM) Systems</option>
                    	<option value="Human Resource Management (HRM) Systems">Human Resource Management (HRM) Systems</option>
                    	<option value="Business Process Management (BPM) Systems">Business Process Management (BPM) Systems</option>
                    	<option value="Enterprise Content Management (ECM) Systems">Enterprise Content Management (ECM) Systems</option>
                    	<option value="Enterprise Collaboration Tools">Enterprise Collaboration Tools</option>
                    	<option value="Business Intelligence (BI) Systems">Business Intelligence (BI) Systems</option>
                    	<option value="Enterprise Data Integration">Enterprise Data Integration</option>
                    	<option value="Enterprise Security Solutions">Enterprise Security Solutions</option>
                    </optgroup>
                    <optgroup label="IT Governance and Compliance">
                    	<option value="IT Policies and Procedures">IT Policies and Procedures</option>
                    	<option value="IT Audit">IT Audit</option>
                    	<option value="Risk Assessment and Management">Risk Assessment and Management</option>
                    	<option value="Regulatory Compliance ">Regulatory Compliance </option>
                    	<option value="IT Governance Frameworks ">IT Governance Frameworks </option>
                    	<option value="Information Security Management Systems (ISMS)">Information Security Management Systems (ISMS)</option>
                    	<option value="Business Continuity Planning (BCP)">Business Continuity Planning (BCP)</option>
                    	<option value="Disaster Recovery Planning (DRP)">Disaster Recovery Planning (DRP)</option>
                    	<option value="IT Compliance Tools">IT Compliance Tools</option>
                    </optgroup>
                    <optgroup label="Machine Learning Concepts">
						<option value="Machine Learning ">Machine Learning </option>
                    	<option value="Classification">Classification</option>
                    	<option value="Regression">Regression</option>
                    	<option value="Clustering">Clustering</option>
                    	<option value="Dimensionality Reduction">Dimensionality Reduction</option>
                    	<option value="Feature Selection">Feature Selection</option>
                    	<option value="Ensemble Learning">Ensemble Learning</option>
                    	<option value="Neural Networks">Neural Networks</option>
                    	<option value="Decision Trees">Decision Trees</option>
                    	<option value="Random Forests">Random Forests</option>
                    	<option value="Support Vector Machines (SVM)">Support Vector Machines (SVM)</option>
                    	<option value="Naive Bayes">Naive Bayes</option>
                    	<option value="K-Nearest Neighbors (KNN)">K-Nearest Neighbors (KNN)</option>
                    	<option value="Reinforcement Learning">Reinforcement Learning</option>
                    	<option value="Natural Language Processing (NLP)">Natural Language Processing (NLP)</option>
                    	<option value="Deep Learning">Deep Learning</option>
                    	<option value="Transfer Learning">Transfer Learning</option>
                    	<option value="Model Evaluation">Model Evaluation</option>
                    	<option value="Cross-Validation">Cross-Validation</option>
                    	<option value="Bias-Variance Tradeoff">Bias-Variance Tradeoff</option>
                    	<option value="Overfitting and Underfitting">Overfitting and Underfitting</option>
                    	<option value="Hyperparameter Tuning">Hyperparameter Tuning</option>
                    	<option value="Gradient Descent">Gradient Descent</option>
                    	<option value="Convolutional Neural Networks (CNN)">Convolutional Neural Networks (CNN)</option>
                    	<option value="Recurrent Neural Networks (RNN)">Recurrent Neural Networks (RNN)</option>
                    	<option value="Generative Adversarial Networks (GAN)">Generative Adversarial Networks (GAN)</option>
                    	<option value="Autoencoders">Autoencoders</option>
                    	<option value="Reinforcement Learning Algorithms">Reinforcement Learning Algorithms</option>
                    	<option value="Explainable AI">Explainable AI</option>
                    	<option value="Model Interpretability">Model Interpretability</option>
                    </optgroup>
                    <optgroup label="Deep Learning Concepts">
						<option value="Deep Learning">Deep Learning</option>
                    	<option value="Neural Networks">Neural Networks</option>
                    	<option value="Convolutional Neural Networks (CNN)">Convolutional Neural Networks (CNN)</option>
                    	<option value="Recurrent Neural Networks (RNN)">Recurrent Neural Networks (RNN)</option>
                    	<option value="Long Short-Term Memory (LSTM)">Long Short-Term Memory (LSTM)</option>
                    	<option value="Gated Recurrent Unit (GRU)">Gated Recurrent Unit (GRU)</option>
                    	<option value="Transformer Networks">Transformer Networks</option>
                    	<option value="Autoencoders">Autoencoders</option>
                    	<option value="Generative Adversarial Networks (GAN)">Generative Adversarial Networks (GAN)</option>
                    	<option value="Variational Autoencoders (VAE)">Variational Autoencoders (VAE)</option>
                    	<option value="Deep Reinforcement Learning">Deep Reinforcement Learning</option>
                    	<option value="Transfer Learning">Transfer Learning</option>
                    	<option value="Pre-trained Models">Pre-trained Models</option>
                    	<option value="Fine-tuning">Fine-tuning</option>
                    	<option value="Dropout Regularization">Dropout Regularization</option>
                    	<option value="Batch Normalization">Batch Normalization</option>
                    	<option value="Activation Functions ">Activation Functions </option>
                    	<option value="Backpropagation">Backpropagation</option>
                    	<option value="Gradient Descent Optimization">Gradient Descent Optimization</option>
                    	<option value="Learning Rate Scheduling">Learning Rate Scheduling</option>
                    	<option value="Hyperparameter Optimization">Hyperparameter Optimization</option>
                    	<option value="Object Detection">Object Detection</option>
                    	<option value="Image Segmentation">Image Segmentation</option>
                    	<option value="Natural Language Processing (NLP) with Deep Learning">Natural Language Processing (NLP) with Deep Learning</option>
                    	<option value="Attention Mechanisms">Attention Mechanisms</option>
                    	<option value="Sequence-to-Sequence Models">Sequence-to-Sequence Models</option>
                    	<option value="Word Embeddings ">Word Embeddings </option>
                    	<option value="Deep Q-Networks (DQN)">Deep Q-Networks (DQN)</option>
                    	<option value="Reinforcement Learning with Deep Learning">Reinforcement Learning with Deep Learning</option>
                    </optgroup>
                    <optgroup label="Apache Frameworks">
                    	<option value="Apache Ambari">Apache Ambari</option>
                    	<option value="Apache Avro">Apache Avro</option>
                    	<option value="Apache Calcite">Apache Calcite</option>
                    	<option value="Apache Cassandra">Apache Cassandra</option>
                    	<option value="Apache CouchDB">Apache CouchDB</option>
                    	<option value="Apache Derby">Apache Derby</option>
                    	<option value="Apache Flink">Apache Flink</option>
                    	<option value="Apache Flume">Apache Flume</option>
                    	<option value="Apache HBase">Apache HBase</option>
                    	<option value="Apache Hadoop">Apache Hadoop</option>
                    	<option value="Apache Hive">Apache Hive</option>
                    	<option value="Apache Ignite">Apache Ignite</option>
                    	<option value="Apache Impala">Apache Impala</option>
                    	<option value="Apache Kafka">Apache Kafka</option>
                    	<option value="Apache Karaf">Apache Karaf</option>
                    	<option value="Apache Mahout">Apache Mahout</option>
                    	<option value="Apache Maven">Apache Maven</option>
                    	<option value="Apache Mesos">Apache Mesos</option>
                    	<option value="Apache Oozie">Apache Oozie</option>
                    	<option value="Apache Phoenix">Apache Phoenix</option>
                    	<option value="Apache Pig">Apache Pig</option>
                    	<option value="Apache Solr">Apache Solr</option>
                    	<option value="Apache Spark">Apache Spark</option>
                    	<option value="Apache Sqoop">Apache Sqoop</option>
                    	<option value="Apache Storm">Apache Storm</option>
                    	<option value="Apache Struts">Apache Struts</option>
                    	<option value="Apache Tez">Apache Tez</option>
                    	<option value="Apache Tomcat">Apache Tomcat</option>
                    	<option value="Apache Zeppelin">Apache Zeppelin</option>
                    	<option value="Apache ZooKeeper">Apache ZooKeeper</option>
                    </optgroup>
                    <optgroup label="Programming Languages">
                    	<option value="ABAP">ABAP</option>
                    	<option value="Ada">Ada</option>
                    	<option value="Apex">Apex</option>
                    	<option value="Assembly">Assembly</option>
                    	<option value="C">C</option>
                    	<option value="C#">C#</option>
                    	<option value="C++">C++</option>
                    	<option value="COBOL">COBOL</option>
                    	<option value="Clojure">Clojure</option>
                    	<option value="D">D</option>
                    	<option value="Dart">Dart</option>
                    	<option value="Elixir">Elixir</option>
                    	<option value="Elm">Elm</option>
                    	<option value="Erlang">Erlang</option>
                    	<option value="F#">F#</option>
                    	<option value="Go (Golang)">Go (Golang)</option>
                    	<option value="Groovy">Groovy</option>
                    	<option value="Haxe">Haxe</option>
                    	<option value="HTML">HTML</option>
                    	<option value="Hack">Hack</option>
                    	<option value="Haskell">Haskell</option>
                    	<option value="Java">Java</option>
                    	<option value="JavaScript">JavaScript</option>
                    	<option value="Julia">Julia</option>
                    	<option value="J">J</option>
                    	<option value="Kotlin">Kotlin</option>
                    	<option value="LISP">LISP</option>
                    	<option value="Lua">Lua</option>
                    	<option value="MATLAB">MATLAB</option>
                    	<option value="Objective-C">Objective-C</option>
                    	<option value="PHP">PHP</option>
                    	<option value="Perl">Perl</option>
                    	<option value="PowerShell">PowerShell</option>
                    	<option value="Prolog">Prolog</option>
                    	<option value="Python">Python</option>
                    	<option value="R">R</option>
                    	<option value="Raku (Perl 6)">Raku (Perl 6)</option>
                    	<option value="Ruby">Ruby</option>
                    	<option value="Rust">Rust</option>
                    	<option value="SQL">SQL</option>
                    	<option value="Scala">Scala</option>
                    	<option value="Solidity">Solidity</option>
                    	<option value="Swift">Swift</option>
                    	<option value="TypeScript">TypeScript</option>
                    	<option value="VBA">VBA</option>
                    	<option value="Visual Basic .NET">Visual Basic .NET</option>
                    </optgroup>
                    <optgroup label="Frameworks">
                    	<option value=".NET Core">.NET Core</option>
                    	<option value="ASP.NET/ASP.NET Core">ASP.NET/ASP.NET Core</option>
                    	<option value="Angular">Angular</option>
                    	<option value="Ansible">Ansible</option>
                    	<option value="Ansible Networking">Ansible Networking</option>
                    	<option value="Ansible Tower">Ansible Tower</option>
                    	<option value="ARM mbed">ARM mbed</option>
                    	<option value="Bootstrap">Bootstrap</option>
                    	<option value="CNTK">CNTK</option>
                    	<option value="Caffe">Caffe</option>
                    	<option value="CatBoost">CatBoost</option>
                    	<option value="Chainer">Chainer</option>
                    	<option value="Chainlink">Chainlink</option>
                    	<option value="Cisco Application Centric Infrastructure (ACI)">Cisco Application Centric Infrastructure (ACI)</option>
                    	<option value="Corda">Corda</option>
                    	<option value="DeepLearning4j">DeepLearning4j</option>
                    	<option value="Django">Django</option>
                    	<option value="Docker">Docker</option>
                    	<option value="Ember.js">Ember.js</option>
                    	<option value="Express.js">Express.js</option>
                    	<option value="Flask">Flask</option>
                    	<option value="FuelPHP">FuelPHP</option>
                    	<option value="Gensim">Gensim</option>
                    	<option value="Gatsby">Gatsby</option>
                    	<option value="H2O.ai">H2O.ai</option>
                    	<option value="Keras">Keras</option>
                    	<option value="Laravel">Laravel</option>
                    	<option value="Losant">Losant</option>
                    	<option value="Material-UI">Material-UI</option>
                    	<option value="Matplotlib">Matplotlib</option>
                    	<option value="Meteor JS">Meteor JS</option>
                    	<option value="Mojolicious">Mojolicious</option>
                    	<option value="MXNet">MXNet</option>
                    	<option value="NLTK (Natural Language Toolkit)">NLTK (Natural Language Toolkit)</option>
                    	<option value="Node-RED">Node-RED</option>
                    	<option value="Node.js">Node.js</option>
                    	<option value="Numpy">Numpy</option>
                    	<option value="ONNX">ONNX</option>
                    	<option value="OpenAI Gym">OpenAI Gym</option>
                    	<option value="OpenCV">OpenCV</option>
                    	<option value="Paho">Paho</option>
                    	<option value="Pandas">Pandas</option>
                    	<option value="Plotly">Plotly</option>
                    	<option value="Polymer JS">Polymer JS</option>
                    	<option value="PySpark">PySpark</option>
                    	<option value="PyTorch">PyTorch</option>
                    	<option value="Quorum">Quorum</option>
                    	<option value="Quorum Maker">Quorum Maker</option>
                    	<option value="Raspberry Pi">Raspberry Pi</option>
                    	<option value="React JS">React JS</option>
                    	<option value="Scikit-learn">Scikit-learn</option>
                    	<option value="Seaborn">Seaborn</option>
                    	<option value="Serverless Framework">Serverless Framework</option>
                    	<option value="SpaCy">SpaCy</option>
                    	<option value="Spring">Spring</option>
                    	<option value="Spring Boot">Spring Boot</option>
                    	<option value="Symfony">Symfony</option>
                    	<option value="TensorFlow">TensorFlow</option>
                    	<option value="Theano">Theano</option>
                    	<option value="Torch">Torch</option>
                    	<option value="Vue.js">Vue.js</option>
                    	<option value="Xamarin">Xamarin</option>
                    	<option value="XGBoost">XGBoost</option>
                    	<option value="Zend Framework">Zend Framework</option>
                    	<option value="Flask">Flask</option>
                    	<option value="jQuery">jQuery</option>
                    	<option value="LightGBM">LightGBM</option>
                    	<option value="D3.js">D3.js</option>
                    </optgroup>
                    <optgroup label="Cloud/Platform Services">
                    	<option value="Alibaba Cloud">Alibaba Cloud</option>
                    	<option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                    	<option value="Google Cloud">Google Cloud</option>
                    	<option value="IBM Cloud">IBM Cloud</option>
                    	<option value="Oracle Cloud">Oracle Cloud</option>
                    	<option value="Alibaba Cloud">Alibaba Cloud</option>
                    	<option value="IBM Cloud">IBM Cloud</option>
                    	<option value="Oracle Cloud">Oracle Cloud</option>
                    	<option value="DigitalOcean">DigitalOcean</option>
                    	<option value="VMware Cloud">VMware Cloud</option>
                    	<option value="Rackspace Cloud">Rackspace Cloud</option>
                    	<option value="Salesforce Cloud">Salesforce Cloud</option>
                    	<option value="SAP Cloud Platform">SAP Cloud Platform</option>
                    	<option value="Red Hat OpenShift">Red Hat OpenShift</option>
                    	<option value="Heroku">Heroku</option>
                    	<option value="Salesforce Sales Cloud">Salesforce Sales Cloud</option>
                    	<option value="Salesforce Service Cloud">Salesforce Service Cloud</option>
                    	<option value="Salesforce Marketing Cloud">Salesforce Marketing Cloud</option>
                    	<option value="Salesforce Commerce Cloud">Salesforce Commerce Cloud</option>
                    	<option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                    	<option value="Google App Engine">Google App Engine</option>
                    	<option value="Google Cloud Storage">Google Cloud Storage</option>
                    	<option value="Google Cloud BigQuery">Google Cloud BigQuery</option>
                    	<option value="Google Cloud Functions">Google Cloud Functions</option>
                    	<option value="Google Cloud Pub/Sub">Google Cloud Pub/Sub</option>
                    	<option value="Google Cloud Firestore">Google Cloud Firestore</option>
                    	<option value="Google Cloud Spanner">Google Cloud Spanner</option>
                    	<option value="Microsoft Azure">Microsoft Azure</option>
                    	<option value="Azure App Service">Azure App Service</option>
                    	<option value="Azure Functions">Azure Functions</option>
                    	<option value="Azure Storage">Azure Storage</option>
                    	<option value="Azure SQL Database">Azure SQL Database</option>
                    	<option value="Azure Cosmos DB">Azure Cosmos DB</option>
                    	<option value="Azure Virtual Machines">Azure Virtual Machines</option>
                    	<option value="AWS Elastic Compute Cloud (EC2)">AWS Elastic Compute Cloud (EC2)</option>
                    	<option value="AWS Lambda">AWS Lambda</option>
                    	<option value="AWS S3 (Simple Storage Service)">AWS S3 (Simple Storage Service)</option>
                    	<option value="AWS RDS (Relational Database Service)">AWS RDS (Relational Database Service)</option>
                    	<option value="AWS DynamoDB">AWS DynamoDB</option>
                    	<option value="AWS CloudFormation">AWS CloudFormation</option>
                    	<option value="AWS CloudFront">AWS CloudFront</option>
                    	<option value="AWS CloudWatch">AWS CloudWatch</option>
                    	<option value="AWS Elastic Beanstalk">AWS Elastic Beanstalk</option>
                    	<option value="AWS Elastic Load Balancer">AWS Elastic Load Balancer</option>
                    	<option value="AWS Redshift">AWS Redshift</option>
                    	<option value="AWS Glacier">AWS Glacier</option>
                    	<option value="AWS Kinesis">AWS Kinesis</option>
                    	<option value="AWS Athena">AWS Athena</option>
                    </optgroup>
                    <optgroup label="Operating Systems">
                    	<option value="Linux">Linux</option>
                    	<option value="macOS">macOS</option>
                    	<option value="Unix">Unix</option>
                    	<option value="Windows">Windows</option>
                    	<option value="Kali linux">Kali linux</option>
                    	<option value="Windows server">Windows server</option>
                    </optgroup>
                    <optgroup label="Databases/Database Management Systems">
                    	<option value="Amazon Aurora">Amazon Aurora</option>
                    	<option value="Amazon DynamoDB">Amazon DynamoDB</option>
                    	<option value="Amazon RDS">Amazon RDS</option>
                    	<option value="Amazon Redshift">Amazon Redshift</option>
                    	<option value="Apache Cassandra">Apache Cassandra</option>
                    	<option value="Apache HBase">Apache HBase</option>
                    	<option value="Apache Hive">Apache Hive</option>
                    	<option value="Azure Cosmos DB">Azure Cosmos DB</option>
                    	<option value="Azure SQL Database">Azure SQL Database</option>
                    	<option value="CouchDB">CouchDB</option>
                    	<option value="Couchbase">Couchbase</option>
                    	<option value="DB2">DB2</option>
                    	<option value="Elasticsearch">Elasticsearch</option>
                    	<option value="Firebase">Firebase</option>
                    	<option value="Google BigQuery">Google BigQuery</option>
                    	<option value="Google Cloud Firestore">Google Cloud Firestore</option>
                    	<option value="Google Cloud Spanner">Google Cloud Spanner</option>
                    	<option value="InfluxDB">InfluxDB</option>
                    	<option value="MariaDB">MariaDB</option>
                    	<option value="Memcached">Memcached</option>
                    	<option value="Microsoft Access">Microsoft Access</option>
                    	<option value="Microsoft SQL Server">Microsoft SQL Server</option>
                    	<option value="MongoDB">MongoDB</option>
                    	<option value="MySQL">MySQL</option>
                    	<option value="Neo4j">Neo4j</option>
                    	<option value="Oracle Database">Oracle Database</option>
                    	<option value="PostgreSQL">PostgreSQL</option>
                    	<option value="Redis">Redis</option>
                    	<option value="SAP HANA">SAP HANA</option>
                    	<option value="SQLite">SQLite</option>
                    	<option value="Snowflake">Snowflake</option>
                    	<option value="Teradata">Teradata</option>
                    </optgroup>
                    <optgroup label="Software Tools/Applications">
                    	<option value="Git">Git</option>
                    	<option value="Microsoft Office Suite">Microsoft Office Suite</option>
                    	<option value="Wireshark">Wireshark</option>
                    	<option value="Jira">Jira</option>
                    	<option value="Confluence">Confluence</option>
                    	<option value="Trello">Trello</option>
                    	<option value="Slack">Slack</option>
                    	<option value="Zoom">Zoom</option>
                    	<option value="Microsoft Teams">Microsoft Teams</option>
                    	<option value="Asana">Asana</option>
                    	<option value="GitHub">GitHub</option>
                    	<option value="Bitbucket">Bitbucket</option>
                    	<option value="Jenkins">Jenkins</option>
                    	<option value="Docker">Docker</option>
                    	<option value="Kubernetes">Kubernetes</option>
                    	<option value="Ansible">Ansible</option>
                    	<option value="Splunk">Splunk</option>
                    	<option value="Nagios">Nagios</option>
                    	<option value="Grafana">Grafana</option>
                    	<option value="Prometheus">Prometheus</option>
                    	<option value="Postman">Postman</option>
                    	<option value="Visual Studio Code">Visual Studio Code</option>
                    	<option value="IntelliJ IDEA">IntelliJ IDEA</option>
                    	<option value="Eclipse">Eclipse</option>
                    	<option value="Sublime Text">Sublime Text</option>
                    	<option value="Notepad++">Notepad++</option>
                    	<option value="Tableau">Tableau</option>
                    	<option value="Adobe Photoshop">Adobe Photoshop</option>
                    	<option value="Adobe Illustrator">Adobe Illustrator</option>
                    	<option value="Adobe Premiere Pro">Adobe Premiere Pro</option>
                    	<option value="AutoCAD">AutoCAD</option>
                    	<option value="MATLAB">MATLAB</option>
                    	<option value="RStudio">RStudio</option>
                    	<option value="Sketch">Sketch</option>
                    	<option value="Figma">Figma</option>
                    	<option value="Salesforce">Salesforce</option>
                    	<option value="Zendesk">Zendesk</option>
                    	<option value="MailChimp">MailChimp</option>
                    	<option value="Google Analytics">Google Analytics</option>
                    	<option value="WordPress">WordPress</option>
                    	<option value="Drupal">Drupal</option>
                    	<option value="Magento">Magento</option>
                    	<option value="Atlassian Suite">Atlassian Suite</option>
                    </optgroup>
                    <optgroup label="Networking Equipment/Technologies">
                    	<option value="Cisco ACI">Cisco ACI</option>
                    	<option value="Network Switches">Network Switches</option>
                    	<option value="Routers">Routers</option>
                    	<option value="Cisco ASA (Adaptive Security Appliance)">Cisco ASA (Adaptive Security Appliance)</option>
                    	<option value="Cisco Catalyst switches">Cisco Catalyst switches</option>
                    	<option value="Juniper Networks routers">Juniper Networks routers</option>
                    	<option value="Palo Alto Networks firewalls">Palo Alto Networks firewalls</option>
                    	<option value="Fortinet firewalls">Fortinet firewalls</option>
                    	<option value="Aruba Networks wireless access points">Aruba Networks wireless access points</option>
                    	<option value="F5 Networks load balancers">F5 Networks load balancers</option>
                    	<option value="Riverbed WAN optimization appliances">Riverbed WAN optimization appliances</option>
                    	<option value="Barracuda Networks security appliances">Barracuda Networks security appliances</option>
                    	<option value="Brocade networking switches">Brocade networking switches</option>
                    	<option value="HP Networking switches">HP Networking switches</option>
                    	<option value="Dell Networking switches">Dell Networking switches</option>
                    	<option value="Extreme Networks switches">Extreme Networks switches</option>
                    	<option value="Check Point firewalls">Check Point firewalls</option>
                    	<option value="SonicWall firewalls">SonicWall firewalls</option>
                    	<option value="Meraki networking equipment">Meraki networking equipment</option>
                    	<option value="Ubiquiti Networks access points and wireless equipment">Ubiquiti Networks access points and wireless equipment</option>
                    	<option value="Alcatel-Lucent Enterprise switches">Alcatel-Lucent Enterprise switches</option>
                    	<option value="HPE Aruba switches">HPE Aruba switches</option>
                    	<option value="Zyxel networking equipment">Zyxel networking equipment</option>
                    	<option value="D-Link switches and routers">D-Link switches and routers</option>
                    	<option value="TP-Link networking equipment">TP-Link networking equipment</option>
                    </optgroup>
                    <optgroup label="Hardware Technologies">
                    	<option value="ARM mbed">ARM mbed</option>
                    	<option value="Intel processors">Intel processors</option>
                    	<option value="AMD processors">AMD processors</option>
                    	<option value="NVIDIA graphics cards">NVIDIA graphics cards</option>
                    	<option value="AMD graphics cards">AMD graphics cards</option>
                    	<option value="Apple Mac computers">Apple Mac computers</option>
                    	<option value="Solid-state drives (SSDs)">Solid-state drives (SSDs)</option>
                    	<option value="hard disk drives (HDDs)">hard disk drives (HDDs)</option>
                    	<option value="Cisco routers and switches">Cisco routers and switches</option>
                    	<option value="Juniper Networks routers and switches">Juniper Networks routers and switches</option>
                    	<option value="Raspberry Pi single-board computers">Raspberry Pi single-board computers</option>
                    	<option value="Arduino microcontrollers">Arduino microcontrollers</option>
                    </optgroup>
                    <optgroup label="3D Printing">
                    	<option value="3D printers">3D printers</option>
                    	<option value="3D printing pens">3D printing pens</option>
                    	<option value="3D printing filaments">3D printing filaments</option>
                    	<option value="3D scanner">3D scanner</option>
                    	<option value="Resin-based 3D printers">Resin-based 3D printers</option>
                    	<option value="Fused Deposition Modeling (FDM) printers">Fused Deposition Modeling (FDM) printers</option>
                    	<option value="Stereolithography (SLA) printers">Stereolithography (SLA) printers</option>
                    	<option value="Selective Laser Sintering (SLS) printers">Selective Laser Sintering (SLS) printers</option>
                    	<option value="Digital Light Processing (DLP) printers">Digital Light Processing (DLP) printers</option>
                    	<option value="3D modeling software">3D modeling software</option>
                    	<option value="3D printing services">3D printing services</option>
                    </optgroup>
                    <optgroup label="Virtual Reality (VR)">
                    	<option value="Virtual Reality">Virtual Reality</option>
                    	<option value="VR headsets">VR headsets</option>
                    	<option value="VR controllers">VR controllers</option>
                    	<option value="VR gaming consoles">VR gaming consoles</option>
                    	<option value="VR content creation tools">VR content creation tools</option>
                    	<option value="VR arcade systems">VR arcade systems</option>
                    	<option value="VR simulations">VR simulations</option>
                    	<option value="Augmented Reality (AR)">Augmented Reality (AR)</option>
                    	<option value="Augmented Reality (AR) headsets">Augmented Reality (AR) headsets</option>
                    	<option value="Mixed Reality (MR) devices">Mixed Reality (MR) devices</option>
                    	<option value="VR gaming PCs">VR gaming PCs</option>
                    	<option value="VR development platforms">VR development platforms</option>
                    	<option value="VR content distribution platforms">VR content distribution platforms</option>
                    </optgroup>
                    <optgroup label="Drones">
                    	<option value="Consumer drones">Consumer drones</option>
                    	<option value="Professional drones">Professional drones</option>
                    	<option value="Drone cameras and gimbals">Drone cameras and gimbals</option>
                    	<option value="Drone accessories (batteries, propellers, cases, etc.)">Drone accessories (batteries, propellers, cases, etc.)</option>
                    	<option value="Drone flight controllers">Drone flight controllers</option>
                    	<option value="Drone pilot training software">Drone pilot training software</option>
                    	<option value="Drone mapping and surveying tools">Drone mapping and surveying tools</option>
                    	<option value="Drone delivery systems">Drone delivery systems</option>
                    	<option value="FPV (First Person View) goggles">FPV (First Person View) goggles</option>
                    	<option value="Drone racing kits">Drone racing kits</option>
                    	<option value="Drone simulators">Drone simulators</option>
                    	<option value="Drone photography and videography software">Drone photography and videography software</option>
                    </optgroup>
                    <optgroup label="Smart Devices">
                    	<option value="Smart TVs">Smart TVs</option>
                    	<option value="Home automation devices">Home automation devices</option>
                    	<option value="Wearable devices">Wearable devices</option>
                    	<option value="Smartphones">Smartphones</option>
                    	<option value="Tablets">Tablets</option>
                    	<option value="Smart speakers">Smart speakers</option>
                    	<option value="Smartwatches">Smartwatches</option>
                    	<option value="Fitness trackers">Fitness trackers</option>
                    	<option value="Smart home security systems">Smart home security systems</option>
                    	<option value="Smart locks">Smart locks</option>
                    	<option value="Smart thermostats">Smart thermostats</option>
                    	<option value="Smart lighting systems">Smart lighting systems</option>
                    	<option value="Smart cameras">Smart cameras</option>
                    	<option value="Smart appliances">Smart appliances</option>
                    	<option value="Smart plugs and switches">Smart plugs and switches</option>
                    	<option value="Smart irrigation systems">Smart irrigation systems</option>
                    	<option value="Smart doorbells">Smart doorbells</option>
                    	<option value="Smart blinds and curtains">Smart blinds and curtains</option>
                    </optgroup>
                    <optgroup label="Cryptocurrency Platforms">
                    	<option value="Chainlink">Chainlink</option>
                    	<option value="Corda">Corda</option>
                    	<option value="Ethereum">Ethereum</option>
                    	<option value="Quorum">Quorum</option>
                    	<option value="Ripple">Ripple</option>
                    </optgroup>
                    <optgroup label="Cryptocurrency Exchanges">
                    	<option value="Binance">Binance</option>
                    	<option value="Coinbase">Coinbase</option>
                    	<option value="Kraken">Kraken</option>
                    	<option value="Bitfinex">Bitfinex</option>
                    	<option value="Huobi">Huobi</option>
                    	<option value="KuCoin">KuCoin</option>
                    	<option value="Gemini">Gemini</option>
                    	<option value="Bitstamp">Bitstamp</option>
                    	<option value="OKEx">OKEx</option>
                    	<option value="Poloniex">Poloniex</option>
                    	<option value="Bittrex">Bittrex</option>
                    	<option value="Coincheck">Coincheck</option>
                    	<option value="Bitmex">Bitmex</option>
                    	<option value="Upbit">Upbit</option>
                    	<option value="CEX.IO">CEX.IO</option>
                    	<option value="HitBTC">HitBTC</option>
                    	<option value="Gate.io">Gate.io</option>
                    	<option value="CoinEx">CoinEx</option>
                    	<option value="Bybit">Bybit</option>
                    	<option value="FTX">FTX</option>
                    	<option value="Bitso">Bitso</option>
                    	<option value="Coinone">Coinone</option>
                    	<option value="Luno">Luno</option>
                    	<option value="Liquid">Liquid</option>
                    	<option value="CoinDCX">CoinDCX</option>
                    </optgroup>
                    <optgroup label="Popular Cryptocurrencies">
                    	<option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                    	<option value="Ethereum (ETH)">Ethereum (ETH)</option>
                    	<option value="Ripple (XRP)">Ripple (XRP)</option>
                    	<option value="Bitcoin Cash (BCH)">Bitcoin Cash (BCH)</option>
                    	<option value="Cardano (ADA)">Cardano (ADA)</option>
                    	<option value="Litecoin (LTC)">Litecoin (LTC)</option>
                    	<option value="Chainlink (LINK)">Chainlink (LINK)</option>
                    	<option value="Polkadot (DOT)">Polkadot (DOT)</option>
                    	<option value="Stellar (XLM)">Stellar (XLM)</option>
                    	<option value="Dogecoin (DOGE)">Dogecoin (DOGE)</option>
                    	<option value="Binance Coin (BNB)">Binance Coin (BNB)</option>
                    	<option value="Tether (USDT)">Tether (USDT)</option>
                    	<option value="USD Coin (USDC)">USD Coin (USDC)</option>
                    	<option value="XRP (XRP)">XRP (XRP)</option>
                    	<option value="Solana (SOL)">Solana (SOL)</option>
                    	<option value="Uniswap (UNI)">Uniswap (UNI)</option>
                    	<option value="Cosmos (ATOM)">Cosmos (ATOM)</option>
                    	<option value="IOTA (MIOTA)">IOTA (MIOTA)</option>
                    	<option value="VeChain (VET)">VeChain (VET)</option>
                    	<option value="Tron (TRX)">Tron (TRX)</option>
                    </optgroup>
                    <optgroup label="Cybersecurity Technologies">
                    	<option value="Antivirus software">Antivirus software</option>
                    	<option value="Microsoft Defender ">Microsoft Defender </option>
                    	<option value="Firewall systems">Firewall systems</option>
                    	<option value="Intrusion Detection Systems (IDS) / Intrusion Prevention Systems (IPS)">Intrusion Detection Systems (IDS) / Intrusion Prevention Systems (IPS)</option>
                    	<option value="McAfee">McAfee</option>
                    	<option value="Trend Micro">Trend Micro</option>
                    	<option value="CrowdStrike">CrowdStrike</option>
                    	<option value="Symantec Endpoint Protection">Symantec Endpoint Protection</option>
                    	<option value="Palo Alto Networks">Palo Alto Networks</option>
                    	<option value="Check Point">Check Point</option>
                    	<option value="Fortinet">Fortinet</option>
                    	<option value="FireEye">FireEye</option>
                    	<option value="Carbon Black">Carbon Black</option>
                    	<option value="Cisco ASA (Adaptive Security Appliance)">Cisco ASA (Adaptive Security Appliance)</option>
                    	<option value="Snort">Snort</option>
                    	<option value="Sophos">Sophos</option>
                    	<option value="Proofpoint">Proofpoint</option>
                    	<option value="Rapid7">Rapid7</option>
                    	<option value="Qualys">Qualys</option>
                    	<option value="Tenable">Tenable</option>
                    	<option value="Trustwave">Trustwave</option>
                    	<option value="Darktrace">Darktrace</option>
                    	<option value="F-Secure">F-Secure</option>
                    	<option value="Kaspersky">Kaspersky</option>
                    	<option value="Bitdefender">Bitdefender</option>
                    	<option value="SentinelOne">SentinelOne</option>
                    	<option value="CyberArk">CyberArk</option>
                    	<option value="Varonis">Varonis</option>
                    	<option value="Forcepoint">Forcepoint</option>
                    	<option value="AlienVault">AlienVault</option>
                    	<option value="Secureworks">Secureworks</option>
                    	<option value="Zscaler">Zscaler</option>
                    	<option value="Barracuda Networks">Barracuda Networks</option>
                    </optgroup>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="numOfSubtopics" className="block text-gray-700 font-medium">
                        Number of Subtopics:
                    </label>
                    <input
                        type="number"
                        id="numOfSubtopics"
                        name="numOfSubtopics"
                        value={formData.numOfSubtopics}
                        onChange={handleInputChange}
                        className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="output_language" className="block text-gray-700 font-medium">Language:</label>
                    <select
                        id="output_language"
                        name="output_language"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"                    >
                        <option value="Mandarin Chinese">Mandarin Chinese</option>
                        <option value="Spanish">Spanish</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Russian">Russian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Punjabi">Western Punjabi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Wu Chinese">Wu Chinese</option>
                        <option value="Turkish">Turkish</option>
                        <option value="Korean">Korean</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Yue Chinese">Yue Chinese</option>
                        <option value="Italian">Italian</option>
                    </select>
                </div>
                {loading ? <ProgressIndicator loading={loading} /> : <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Submit
                </button>}
            </form>
            <BookTable bookData={bookData} data={email} getBooks={getBooks} />
        </div>
    );
};

export default Dashboard;
