import request from '../utils/request';

export function getBloggerInfo() {
  return request.get('/api/bloggerInfo');
}

export function getBlogs(params) {
  return request.get('/api/blogs', {params});
}
