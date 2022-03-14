const BASE_URL = 'https://learn.codeit.kr/api';

export async function getReviews({
  order = 'createdAt',
  offset = 0,
  limit = 6,
}) {

  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error('리뷰를 불러오는 데 실패했습니다.')
  }
  const body = await response.json();
  
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`,{
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('리뷰를 생성하는 데 실패했습니다.')
  }
  const body = await response.json();
  return body;
}

export async function updateReview({id, formData}) {
  // id 값을 받아와 수정할 컨텐츠를 알려준다.
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`,{
    // 수정을 의미하는 PUT으로 바꿔준다.
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('리뷰를 수정하는 데 실패했습니다.')
  }
  const body = await response.json();
  return body;
}