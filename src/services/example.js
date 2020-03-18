import request from '../utils/request';

export function getBloggerInfo() {
  return request('/api/bloggerInfo');
}
