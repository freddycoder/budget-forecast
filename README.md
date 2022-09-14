# budget-forecast

I little app I build to help me forecast my budget and learn React.

Try the app: https://freddycoder.github.io/budget-forecast/

## Features

- The app work in french or english
- Ability to enter mortgage
- Ability to enter income and expenses
- Display a simulation of the budget over the period of the mortgage

## Docker

To build the docker image:

```bash
docker build -t budget-forecast .
```

To run the docker image:

```bash
docker run -p 8080:80 budget-forecast
```

The site is accessible at http://localhost:8080/budget-forecast