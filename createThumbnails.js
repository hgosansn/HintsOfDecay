/**
 * This script generates thumbnails for each article in the ARTICLES array.
 * It uses the sharp library to resize and create the thumbnails.
 * The thumbnail path is then added to the corresponding article object in the ARTICLES array.
 * Finally, the updated ARTICLES array is saved back to the articles.js file.
 */
const fs = require('fs');
const { Configuration, OpenAI } = require('openai');
const path = require('path');
const https = require('https');

// Save the updated articles.js file
// Update the article-preview.jsx file to use the thumbnail path
// Create a new file called createThumbnails.js
// Add code to create thumbnails for each article
// Run the script to generate the thumbnails
// Update the articles.js file to include the thumbnail paths
// Update the article-preview.jsx file to use the thumbnail paths


const ARTICLES = require('./src/js/data/articles.js');

const { execSync } = require('child_process');

function getApiKey() {
    try {
        const apiKey = execSync(
            'security find-generic-password -a "OpenAI" -s "OpenAI_API_Key" -w'
        )
            .toString()
            .trim();
        return apiKey;
    } catch (error) {
        console.error('Failed to retrieve API key:', error.message);
        return null;
    }
}

const configuration = {
    apiKey: getApiKey(),
};

const openai = new OpenAI(configuration);

// Function to download and save the image
function downloadImage(url, outputPath) {
    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
        // Check if the request was successful
        if (response.statusCode === 200) {
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`Image saved to ${outputPath}`);
        });
        } else {
        console.error(`Failed to download image. Status Code: ${response.statusCode}`);
        }
    }).on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file if there's an error
        console.error(`Error: ${err.message}`);
    });
}


async function generateAndSaveImage(path, promptText) {
    try {
        // Generate the image using DALL-E
        const response = await openai.images.generate({
            prompt: promptText,
            n: 1,
            size: '512x512', // You can adjust the size as needed
        });

        // Extract the URL of the generated image
        const imageData = response.data;
        const imageUrl = imageData[0].url;
        //console.log('imageData', response, imageData);
        console.log('imageUrl:', imageUrl);

        downloadImage(imageUrl, path);

        console.log(`Image saved to ${path}`);
    } catch (error) {
        console.error('Error generating or saving the image:', error);
    }
}

// Find a proper image for each article
const fetchArticleImage = async (article) => {
    for (let i = 0; i < ARTICLES.length; i++) {
        // Assuming each article has an 'imagePath' property
        const article = ARTICLES[i];
        const imagePath = article.image;
        // Check if the image exists
        if (fs.existsSync('src/' + imagePath)) {
            console.log(`Image exists for article ${article.title}`);
        } else {
            console.error(`Image does not exist for article ${article.title}`);
            console.log(article);
            // Wait 1sec before requesting the next image
            // Node sleep
            generateAndSaveImage(
                'src/' + article.image,
                article.title
            );
            await new Promise(resolve => setTimeout(resolve, 20000));
        }
    }
}

fetchArticleImage();
