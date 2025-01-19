## Overview
We addressed a combination of **Problem Statement 1** and **Problem Statement 2**, focusing on improving article publishing across various platforms. Our solution leverages the capabilities of **Large Language Models (LLMs)**, including **LLaMA**, **Mistral**, and **Gemini**, to enhance the quality, relevance, and adaptability of content for diverse audiences and mediums.

To make the solution accessible and user-friendly, we developed an **interactive user interface** using **Next.js** and **Tailwind CSS**. This interface enables users to seamlessly interact with the system, customize content, and publish articles efficiently across multiple platforms.

By integrating these state-of-the-art LLMs with a robust front-end, our solution provides a scalable, efficient, and user-centric platform for content creators and publishers.

---

## Key Insights Provided
1. **Media Insights**
2. **Article Post Generation Based on Brand Details**
3. **Multilingual Articles**
4. **Web Scraping for Media Insights**
![WhatsApp Image 2025-01-18 at 23 57 19_e1166db0](https://github.com/user-attachments/assets/5948f3ff-f474-46de-935d-14def588446a)


---

## Workflow of the Project

### 1. User Input Collection
The system begins by gathering essential details from the user, including:
- **Brand Name**
- **Tagline**
- **Service Type**
- **Industry Type**
- **Target Audience**

### 2. Product Details Gathering
Users are prompted to provide specific information about the product, such as:
- **Features**
- **Unique Selling Points (USPs)**
- **Primary Problem Solved**

![WhatsApp Image 2025-01-18 at 23 55 49_21cff0bc](https://github.com/user-attachments/assets/74a46f83-248f-457f-82ce-d2dd051ef7e5)


### 3. Media Scraping and Insights Generation
The system scrapes relevant media data from sources like **social media platforms**, **blogs**, and **competitor websites** to gain valuable insights. Based on the collected data, the system generates actionable insights, including:
- **Pain Points**: Challenges faced by the target audience.
- **Primary Audience Demographics**: Key audience characteristics.
- **Competitors and Market Position**: Insights into competitors and the brand’s positioning in the market.

### 4. Article Planning and Generation
Using the media insights and user-provided details, the system helps decide article parameters, such as:
- **Target Platform**: Selecting the most relevant platform for publishing.
- **Article Length**: Determining the appropriate word count.

The system then generates an **English article**, customized to meet the brand's needs.

### 5. Audio/Video Transcription and Translation
- Users can upload **audio/video content**, which the system transcribes into text.
- The transcribed text is translated into **10 native Indian languages**, allowing for broader reach and accessibility.
![WhatsApp Image 2025-01-19 at 00 00 42_8a14bab6](https://github.com/user-attachments/assets/7d05bdbe-ddfc-4019-a192-37bc87fed108)


### 6. Multilingual Conversion and Quality Check
- The English article and transcriptions are translated into **10 native Indian languages** with cultural relevance and linguistic accuracy.
- Translations are evaluated using **BLEU** and **ROUGE scores**, ensuring high-quality content across languages.

![WhatsApp Image 2025-01-18 at 23 56 11_731be278](https://github.com/user-attachments/assets/1ffd07c7-7630-464b-868b-3ec5b8cee396)


---

## Features and Technologies Used
1. **Interactive User Interface**
   - Developed using **Next.js** and **Tailwind CSS**, providing a responsive and user-friendly experience.

2. **Multilingual Support**
   - Automated translations in **10 native Indian languages**, expanding accessibility and engagement.

3. **Media Scraping**
   - Automated data scraping from online sources to provide insights into audience demographics, pain points, and competitors.

4. **Audio/Video Transcription and Translation**
   - Transcribes uploaded media files and translates them into multiple languages, enabling multimedia content optimization.

5. **Insights Engine**
   - Offers detailed media insights to refine content strategies for article marketing.

6. **Quality Metrics**
   - BLEU and ROUGE scores are used to evaluate the accuracy and quality of translations and generated content.

![WhatsApp Image 2025-01-18 at 23 57 11_5fa8e0e9](https://github.com/user-attachments/assets/b1c18171-cec8-459b-91a4-05129917d6e4)


---

## Challenges Faced During Development

### 1. Model Downtime on Render
- While hosting the LLM models on Render, we encountered frequent **downtime issues**, impacting the reliability of our project during crucial stages.
- This required constant troubleshooting and testing to maintain system functionality.

### 2. Database Integration Issues with AstraDB
- Initially, we planned to integrate **AstraDB** for database management. However, due to technical complications and delays in setup, we faced significant hurdles in achieving seamless integration.
- After discussing alternatives with our mentor, we pivoted to **Firebase** at the last hour. This quick switch required rapid reconfiguration of database queries and adjustments to our workflow.

---

## GitHub Repositories
Here are the GitHub repositories associated with different components of the project:

1. [Translator API Key](https://github.com/DD-og/translator-api-key)
2. [Market Insights API](https://github.com/DD-og/market-insights-api)
3. [Content Insight API](https://github.com/DD-og/content-insight-api)
4. [Transcriber-Translator](https://github.com/Chinmay072/Transcriber-Translator)
5. [Content Streamlit](https://github.com/Chinmay072/Content-Strmlt)
6. [Insight](https://github.com/Chinmay072/Insight)
7. [Video Transcribe](https://github.com/Chinmay072/video-transcribe)

---
