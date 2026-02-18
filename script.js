document.addEventListener('DOMContentLoaded', () => {
    // Page Transitions
    document.body.classList.add('fade-in');

    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only intercept internal links
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Matches CSS transition duration
            }
        });
    });

    // Particle Animation for Entryway
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;

        // Resize Canvas
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        // Mouse Interaction
        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = 'rgba(255, 255, 255, 0.2)'; // Subtle white
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse Repel
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = 150;
                    let force = (maxDistance - distance) / maxDistance;

                    if (distance < maxDistance) {
                        this.x -= forceDirectionX * force * 2;
                        this.y -= forceDirectionY * force * 2;
                    }
                }

                // Screen Wrap
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize Particles
        function init() {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        }

        // Animate
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Connect particles with weak lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // Gallery Upload Logic
    const photoUpload = document.getElementById('photo-upload');
    const galleryWall = document.getElementById('gallery-wall');

    function saveGallery() {
        try {
            const frames = Array.from(galleryWall.querySelectorAll('.frame'));
            const galleryData = frames.map(frame => {
                const img = frame.querySelector('img');
                return img ? img.src : null;
            });
            localStorage.setItem('galleryPhotos', JSON.stringify(galleryData));
            console.log('Gallery saved successfully.');
        } catch (e) {
            console.error('Failed to save gallery to localStorage:', e);
            if (e.name === 'QuotaExceededError') {
                alert('Gallery storage is full. Please try using smaller images.');
            }
        }
    }

    function loadGallery() {
        try {
            const galleryData = JSON.parse(localStorage.getItem('galleryPhotos'));
            console.log('Loading gallery from storage:', galleryData ? `${galleryData.filter(x => x).length} photos found` : 'No photos found');

            if (galleryData) {
                const frames = Array.from(galleryWall.querySelectorAll('.frame'));
                galleryData.forEach((src, index) => {
                    if (src && frames[index]) {
                        let img = frames[index].querySelector('img');
                        if (!img) {
                            img = document.createElement('img');
                            frames[index].appendChild(img);
                        }
                        img.src = src;
                        img.style.display = 'block';
                    }
                });
            }
        } catch (e) {
            console.error('Error loading gallery:', e);
        }
    }

    if (photoUpload && galleryWall) {
        loadGallery();

        // Add helpful title for owner (won't show up much for visitors unless they hover long)
        galleryWall.querySelectorAll('.frame').forEach(f => {
            f.title = "Click to upload/change photo";
        });

        photoUpload.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                console.log(`Uploading ${files.length} files...`);
                const frames = Array.from(galleryWall.querySelectorAll('.frame'));

                files.forEach((file, index) => {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        // Find first empty frame or wrap around
                        let targetFrame = frames.find(f => !f.querySelector('img'));

                        if (!targetFrame) {
                            // Replace frames sequentially if all are full
                            targetFrame = frames[index % frames.length];
                        }

                        let img = targetFrame.querySelector('img');
                        if (!img) {
                            img = document.createElement('img');
                            targetFrame.appendChild(img);
                        }
                        img.src = event.target.result;
                        img.style.display = 'block';

                        // Add a nice "pop" effect
                        targetFrame.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            targetFrame.style.transform = '';
                        }, 300);

                        saveGallery(); // Save after each upload
                    };

                    reader.readAsDataURL(file);
                });
            }
        });

        // Specific click handler for frames on the gallery page
        galleryWall.addEventListener('click', (e) => {
            const frame = e.target.closest('.frame');
            if (frame) {
                photoUpload.click();
            }
        });
    }

    // Music Album Note Interaction
    const albumCards = document.querySelectorAll('.album-card');
    const filmCards = document.querySelectorAll('.film-card');
    const noteOverlay = document.getElementById('note-overlay');
    const noteTitleMusic = document.getElementById('note-album-title');
    const noteArtistMusic = document.getElementById('note-album-artist');
    const noteTitleFilm = document.getElementById('note-film-title');
    const noteDirectorFilm = document.getElementById('note-film-director');
    const noteText = document.getElementById('note-text');
    const closeNoteBtn = document.querySelector('.close-note');

    if ((albumCards.length > 0 || filmCards.length > 0) && noteOverlay) {
        // Music Cards Click
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.album-title').textContent;
                const artist = card.querySelector('.album-artist').textContent;
                const note = card.getAttribute('data-note');
                const favSong = card.getAttribute('data-fav-song');
                const favSongEl = document.getElementById('note-fav-song');
                const favSongDisplay = document.querySelector('.fav-song-display');

                if (noteTitleMusic) noteTitleMusic.textContent = title;
                if (noteArtistMusic) noteArtistMusic.textContent = artist;
                noteText.textContent = note;

                if (favSongDisplay) {
                    if (favSong) {
                        if (favSongEl) favSongEl.textContent = favSong;
                        favSongDisplay.style.display = 'flex';
                    } else {
                        favSongDisplay.style.display = 'none';
                    }
                }

                noteOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Film Cards Click
        filmCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.film-title').textContent;
                const director = card.querySelector('.film-director').textContent;
                const note = card.getAttribute('data-note');
                const favSongDisplay = document.querySelector('.fav-song-display');

                if (noteTitleFilm) noteTitleFilm.textContent = title;
                if (noteDirectorFilm) noteDirectorFilm.textContent = director;
                noteText.textContent = note;
                if (favSongDisplay) favSongDisplay.style.display = 'none';

                noteOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeNote() {
            noteOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }

        if (closeNoteBtn) {
            closeNoteBtn.addEventListener('click', closeNote);
        }

        // Close on clicking outside the content
        noteOverlay.addEventListener('click', (e) => {
            if (e.target === noteOverlay) {
                closeNote();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && noteOverlay.classList.contains('active')) {
                closeNote();
            }
        });
    }
});
