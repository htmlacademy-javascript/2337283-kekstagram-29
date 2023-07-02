import { getIDGenerator, getRandomArrayEllement, getRandomNumber } from './util';

//array of messages which should be stated by commentators
const MESSAGES = [
  'Всё отлично',
  'В целом все неплохо, но не все',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

//names
const NAMES = ['Аврора', 'Эмилия','Габриель', 'Исла', 'Зоя', 'Адриана'];


//descriptions
const DESCRIPTIONS = [
  'Невероятный вид из окна!',
  'Бесконечное поле солнечных цветов',
  'Одна из самых красивых сцен, которые мне доводилось видеть.',
  'Красочная птица, прекрасно вписавшаяся в окружающую среду.',
  'Романтический закат на океане.',
  'Совершенное место для отдыха и релакса.',
  'Великолепный зал с пышным декором.',
  'Чудесный городской пейзаж',
  'Отражение звезд на зеркальной воде озера.',
  'Нежные пастельные цвета в закатном небе.',
  'Отмечать лучшие моменты жизни в кругу друзей.',
  'Величественные горы, природа находится в своей прекрасной форме.',
  'Солнце, море и пальмы - что еще нужно для полного счастья?',
  'Место, где красота природы чарует душу.',
  'Желтые листья среди красочных деревьев.',
  'Нет лучше места для совершения прогулки, чем этот лес.',
  'Необычная архитектура в центре города.',
  'Цветы на фоне использованные как фон.',
  'Каменные арки, окружающие колоритную зелень.',
  'Очень крутая атмосфера на улицах.',
  'Оригинальное здание с броским фасадом.',
  'Постановка сцены, которая действительно оживает перед глазами.',
  'Очень красиво такой снимок в портретном формате сделан.',
  'Небольшое маленькое кафе, полное аромата свежеиспеченной выпечки.',
  'Некоторые виды просто потрясают воспаление красотой и великолепием.'
];

const Photos = {
  MIN: 1,
  MAX: 25
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const Avatars = {
  MIN: 1,
  MAX: 6
};

const photoID = getIDGenerator(1, Photos.MAX);
const commentID = getIDGenerator(1, Comments.MAX);
const photoNumberURL = getIDGenerator(1, Photos.MAX);

//creating random comment;
const createComment = () => ({
  id: commentID(),
  avatar: `img/avatar-${getRandomNumber(Avatars.MIN, Avatars.MAX)}.svg`,
  message: getRandomArrayEllement(MESSAGES),
  name: getRandomArrayEllement(NAMES)});

//creating random photo object
const createPhoto = () => ({
  id: photoID(),
  url: `photos/${photoNumberURL()}.jpg`,
  description: getRandomArrayEllement(DESCRIPTIONS),
  likes: getRandomNumber(Likes.MIN, Likes.MAX),
  comments: Array.from({length: getRandomNumber(0, Avatars.MAX)}, createComment),}
);

const randomPhotos = () => Array.from({length:Photos.MAX}, createPhoto);
// randomPhotos();
export {randomPhotos};
