<h1 align="center" id="title">BaranGPT</h1>

<p align="center"><img src="https://avatars.steamstatic.com/2904e56a881d6ab0b678191313762051126535d0_medium.jpg" alt="project-image"></p>

<p id="description" align="center">Приватная GPT-Like нейросеть без лимитов и ограничений</p>

<p align="center"><img src="https://img.shields.io/badge/ARC--Test-63/100-pink" alt="shields"> <img src="https://img.shields.io/badge/HellaSwag--Test-91/100-pink" alt="shields"> <img src="https://img.shields.io/badge/MMLU--Test-47/100-pink" alt="shields"> <img src="https://img.shields.io/badge/TruthfulQA--Test-45/100-pink" alt="shields"></p>

<h2>🚀 Демо</h2>

[\[vitalikparkur.pro\]](https://highpix.github.io/barantalk)

Это закрытое демо, для получения токена обратитесь ко мне в [Telegram](https://t.me/dengimod3)
<h2>Пользовательский интерфейс:</h2>

<img src="https://sun4-18.userapi.com/impg/Klz1e1vgIamtpvi3gBQ9ZuSeD_LBDc5hTBqq3g/cNaGDDj0d7k.jpg?size=1280x723&amp;quality=96&amp;sign=ec3a4e83930579372a78b2f4102de818&amp;type=album" alt="project-screenshot" width="1100" height="580">

  
  
<h2>🧐 Уникальные возможности</h2>

*   Генерация текста без ограничений (нет лимита на количество символов)
*   Отсутствие сбора информации, ваши чаты не логируются

<h2>🛠️ API Endpoints</h2>
| Отправка запроса в BaranGPT =)

```
Request: /api/request?data=text&token=test-key | text - текст запроса | token - токен авторизации
200 Response: {"response": "Generated text\nNew line"}
400 Response: {"error": "Missing parameters"}
401 Response: {"error": "Unauthorized"}
500 Response: {"error": "Server not responding or busy"}
```
| Авторизация
```
Request: /api/auth?token=test-key | token - токен авторизации
200 Response: {"status": "Authorized"}
400 Response: {"error": "Missing parameters"}
401 Response: {"status": "Unauthorized"}
```
| Очистка контекста
```
Request: /api/clearContext?token=test-key | token - токен авторизации
200 Response: {"status": "Context cleaned"}
400 Response: {"error": "Missing parameters"}
401 Response: {"error": "Unauthorized"}
500 Response: {"status": "Context cleaning failed"}
```
| Получение истории чата
```
Request: /api/chatHistory?token=test-key | token - токен авторизации
200 Response: 
{
  "user-messageId": "Привет",
  "bot-messageId": "Фарту чифирной, как житуха?",
  "user-messageId": "Липа не трещит караси не клюют",
  "bot-messageId": "Возможно, в вашем вопросе имеется в виду поговорка или пословица, которая может использоваться в различных ситуациях.\nОднако, такая фраза не имеет прямого связанного значения в реальности или научном контексте. Поэтому, я могу предположить возможные значения или объяснения, но они будут только гипотетическими:",
}
400 Response: {"error": "Missing parameters"}
401 Response: {"error": "Unauthorized"}
500 Response: {"error": "Server not responding or busy"}
```
| Получение статуса доступности сервера
```
Request: /api/serverStatus?token=test-key | token - токен авторизации
200 Response: {"server": "Available"}
400 Response: {"error": "Missing parameters"}
401 Response: {"error": "Unauthorized"}
500 Response: {"error": "Server is offline"}
```
