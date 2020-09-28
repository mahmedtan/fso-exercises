const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => {
  const arrNum = blogs.map((item) => item.likes);
  return blogs.find((item) => Math.max(...arrNum) === item.likes);
};

const mostBlogs = (blogs) => {
  const authors = [];
  const findAuthor = (item) => authors.find((i) => i.author === item.author);

  blogs.forEach((item) =>
    findAuthor(item)
      ? findAuthor(item).blogs++
      : authors.push({ author: item.author, blogs: 1 })
  );
  const arrBlogs = authors.map((item) => item.blogs);
  return authors.find((item) => Math.max(...arrBlogs) === item.blogs);
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
