const imageKit = require('@imagekit/nodejs');

const imageKitClient = new imageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadImage(image , name){

    const uploadedFile = await imageKitClient.files.upload({
        file: image,
        fileName: name,
        folder: "/fruitBasket/products"
    })

    return uploadedFile;

}

module.exports = { uploadImage };