<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Aesthetically Pleasing Photo Album</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }

        @keyframes flip {
            from {
                transform: rotateY(0);
            }
            to {
                transform: rotateY(180deg);
            }
        }

        .flip-animation {
            animation: flip 1s;
        }
    </style>
</head>

<body class="bg-gray-100">
    <div class="container mx-auto p-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">Create Your Aesthetically Pleasing Photo Album</h1>
            <p class="text-lg text-gray-600 mb-8">Customize your album's theme, add a tagline, and choose the number of photos to start creating.</p>
        </div>

        <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
            <div class="mb-4">
                <label for="theme" class="block text-gray-700 text-sm font-bold mb-2">Theme:</label>
                <select id="theme" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="vintage">Vintage</option>
                    <option value="colorful">Colorful</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="tagline" class="block text-gray-700 text-sm font-bold mb-2">Tagline:</label>
                <input type="text" id="tagline" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="A Journey to Remember...">
            </div>

            <div class="mb-6">
                <label for="number-of-photos" class="block text-gray-700 text-sm font-bold mb-2">Number of Photos:</label>
                <input type="number" id="number-of-photos" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="5 - 30" min="5" max="30">
            </div>

            <button id="start-creating" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Start Creating
            </button>
        </div>

        <div id="photo-album" class="hidden">
            <!-- Thumbnails/templates will be injected here using JavaScript -->
        </div>

        <div class="flex justify-between items-center mt-4">
            <button id="previous" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline hidden">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            <button id="next" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline hidden">
                Next <i class="fas fa-arrow-right"></i>
            </button>
            <button id="end-creating" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hidden">
                End Creating
            </button>
        </div>
    </div>

    <script>
        const startCreatingBtn = document.getElementById('start-creating');
        const nextBtn = document.getElementById('next');
        const previousBtn = document.getElementById('previous');
        const endCreatingBtn = document.getElementById('end-creating');
        const photoAlbum = document.getElementById('photo-album');
        let currentPhotoIndex = 0;

        startCreatingBtn.addEventListener('click', function () {
            const numOfPhotos = parseInt(document.getElementById('number-of-photos').value) || 0;
            if (numOfPhotos >= 5 && numOfPhotos <= 30) {
                photoAlbum.innerHTML = '';
                for (let i = 0; i < numOfPhotos; i++) {
                    const thumbnail = document.createElement('div');
                    thumbnail.className = 'w-full h-64 bg-gray-300 rounded-lg mb-4 flip-animation cursor-pointer';
                    thumbnail.onclick = function () {
                        // Placeholder for upload functionality
                        alert('Upload functionality will be implemented here.');
                    };
                    photoAlbum.appendChild(thumbnail);
                }
                photoAlbum.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
                previousBtn.classList.remove('hidden');
                endCreatingBtn.classList.remove('hidden');
            } else {
                alert('Please enter a number between 5 and 30.');
            }
        });

        nextBtn.addEventListener('click', function () {
            if (currentPhotoIndex < photoAlbum.children.length - 1) {
                photoAlbum.children[currentPhotoIndex].classList.add('hidden');
                currentPhotoIndex++;
                photoAlbum.children[currentPhotoIndex].classList.remove('hidden');
            }
        });

        previousBtn.addEventListener('click', function () {
            if (currentPhotoIndex > 0) {
                photoAlbum.children[currentPhotoIndex].classList.add('hidden');
                currentPhotoIndex--;
                photoAlbum.children[currentPhotoIndex].classList.remove('hidden');
            }
        });

        endCreatingBtn.addEventListener('click', function () {
            alert('Your photo album has been created!');
            // Finalize album creation here
        });
    </script>
</body>

</html>