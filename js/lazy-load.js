//Get images with data-src attribute
const imagesToLoad = document.querySelectorAll('img[data-src]');

//Set IntersectionalObserver
const imgOptions = {
    threshold: 1,
    rootMargin: '0px 0px 250px 0px'
};

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

//Verify IntersectionalObserver is supported
if('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imgOptions);
    
//Image Loop to verify status and load all images if needed
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}