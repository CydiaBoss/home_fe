export default {
  getUserProfile() {
    return new Promise((resolve) => {
      resolve({
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
        },
        photos: [
          {
            id: 1,
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
            tags: ['nature', 'water', 'mountain']
          },
          {
            id: 2,
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2'
          },
          {
            id: 3,
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3'
          }
        ],
        videos: [
          {
            id: 1,
            title: 'Oceans',
            alt: 'A video of ocean waves.',
            itemImageSrc: 'https://vjs.zencdn.net/v/oceans.mp4',
            tags: ['ocean', 'waves', 'nature'],
          },
          {
            id: 3,
            title: 'Elephants Dream',
            alt: 'A short film by the Blender Foundation.',
            itemImageSrc: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4',
            tags: ['sci-fi', 'animation', 'short film']
          },
        ]
      });
    });
  },
  getUserPhotos() {
    return this.getUserProfile();
  },
  getPhotoById(id) {
    return new Promise((resolve) => {
        const photos = [
          {
            id: 1,
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
            isFavorited: false,
            comments: [
                { id: 1, author: 'Jane Doe', text: 'Great photo!', createdAt: '2023-10-27T10:00:00Z' }
            ],
            tags: ['nature', 'water', 'mountain']
          },
          {
            id: 2,
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2',
            isFavorited: true,
            comments: []
          },
          {
            id: 3,
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3',
            isFavorited: false,
            comments: []
          }
        ];
        const photo = photos.find(p => p.id == id);
        resolve(photo);
    });
  },
  getUserVideos() {
    return this.getUserProfile();
  },
  getVideoById(id) {
    return new Promise((resolve) => {
        const videos = [
          {
            id: 1,
            title: 'Oceans',
            alt: 'A video of ocean waves.',
            itemImageSrc: 'https://vjs.zencdn.net/v/oceans.mp4',
            tags: ['ocean', 'waves', 'nature'],
            isFavorited: false,
            comments: [
              { id: 1, author: 'Jane Doe', text: 'Beautiful!', createdAt: new Date().toLocaleString() },
              { id: 2, author: 'John Smith', text: 'Amazing footage.', createdAt: new Date().toLocaleString() }
            ]
          },
          {
            id: 3,
            title: 'Elephants Dream',
            alt: 'A short film by the Blender Foundation.',
            itemImageSrc: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4',
            tags: ['sci-fi', 'animation', 'short film'],
            isFavorited: false,
            comments: []
          },
        ];
        const video = videos.find(v => v.id == id);
        resolve(video);
    });
  }
};