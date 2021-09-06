Реалізовано CRUD функціонал для новин. Також виконані додаткові завдання: пагінація та валідація.

----------------------------------------------------------------

GET /news/
Повертає список новин. Опціонально можна передавати page та limit (пагінація)

req /news/?limit=2&page=4

res
[
{
"id": 7,
"title": "News",
"description": "Some news description",
"tags": [
"#someTag",
"#AlsoSmth"
],
"date": "2021-09-06"
},
{
"id": 8,
"title": "News",
"description": "Some news description",
"tags": [
"#someTag",
"#AlsoSmth"
],
"date": "2021-09-06"
}
]

----------------------------------------------------------------

GET /news/getOne
Повертає одну новину по запитаному id

req /news/getOne?id=4

res
{
"id": 4,
"title": "News",
"description": "Some news description",
"tags": [
"#someTag",
"#AlsoSmth"
],
"date": "2021-09-06"
}

----------------------------------------------------------------

POST /news/
Створює новину.

req
{
"title": "News",
"description": "Some news description",
"tags": ["#someTag", "#AlsoSmth"], // необов'язковий параметри
"date": "2021-09-06"
}

res
{
"id": 19,
"title": "News",
"description": "Some news description",
"tags": "#someTag #AlsoSmth",
"date": "2021-09-06"
}

----------------------------------------------------------------

PUT /news/
Оновити новину за певним id

req
{
    "id": 4,
    "title": "Vlad",
    "description" : "Changed news",
    "tags": ["#newTags", "#newTags"],
    "date": "2021-02-01"
}

res
{
    "message": "Успешно изменено!"
}

----------------------------------------------------------------

DELETE /news/
Видалити новину за певним id

req /news/?id=6

res 
{
    "id": 3,
    "title": "News",
    "description": "Some news description",
    "tags": "#someTag #AlsoSmth",
    "date": "2021-09-06"
}

----------------------------------------------------------------
