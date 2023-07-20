# Hybrainer

## Backend
### Commands
В `/backend/` moжно запустить команды:
- `yarn start` - запустить бэкэнд
- `yarn dev` - запустить бэкэнд и перезапускать при изменении файлов
- `yarn lint --fix` - форматировать код
### .env
В `/.env` (корневая папка проекта) должны быть заданы переменные:
OPENAI_API_KEY={ключ к API openAI}
OPENAI_ORGANIZATION={id организации, к которой привязан ключ openAI}

## Frontend (/extension)
### Commands
В `/extension/` можно запустить команды:
- `lintfix` - форматировать код
- `build` - сделать билд
- `dev` - сделать билд и переделывать его при изменении файловов
- `package` - сделать билд и запокавать его в .zip готовый для отгрузки в extension store

### /lib/settings.ts
Здесь можно изменить настройку ip и порта, на которых находится бэкэнд.
