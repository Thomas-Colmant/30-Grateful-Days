const sharp = require('sharp');

// L'image fait ~960x1280 (portrait phone photo)
// Le moniteur occupe le haut de l'image, le bureau/clavier en bas
// On garde la partie haut (l'écran) et on coupe le bas (bureau + clavier)

async function crop() {
    const image = sharp('photos anglais/montage.jpg');
    const meta = await image.metadata();
    console.log(`Dimensions originales: ${meta.width}x${meta.height}`);

    // Recadrage: on garde les ~73% du haut (l'écran du moniteur)
    // et on centre horizontalement en supprimant un peu des bords noirs
    const newHeight = Math.round(meta.height * 0.72);
    const cropLeft = Math.round(meta.width * 0.02);
    const cropWidth = meta.width - cropLeft * 2;

    await sharp('photos anglais/montage.jpg')
        .extract({
            left: cropLeft,
            top: 0,
            width: cropWidth,
            height: newHeight
        })
        .toFile('photos anglais/montage.jpg.bak.jpg'); // backup d'abord

    // Maintenant on écrase l'original
    await sharp('photos anglais/montage.jpg')
        .extract({
            left: cropLeft,
            top: 0,
            width: cropWidth,
            height: newHeight
        })
        .jpeg({ quality: 90 })
        .toFile('photos anglais/montage_crop.jpg');

    console.log(`Recadré: ${cropWidth}x${newHeight}`);
    console.log('Fichier sauvegardé: photos anglais/montage_crop.jpg');
    console.log('Backup: photos anglais/montage.jpg.bak.jpg');
}

crop().catch(console.error);
