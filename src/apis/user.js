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
            title: 'Title 1'
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
        ]
      });
    });
  },
  getUserPhotos() {
    return this.getUserProfile();
  }
};