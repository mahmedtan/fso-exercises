const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => {
  const arrNum = blogs.map((item) => item.likes);
  return blogs.find((item) => Math.max(...arrNum) === item.likes);
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
