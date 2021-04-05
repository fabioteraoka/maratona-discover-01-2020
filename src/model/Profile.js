let data = {
    name: "Fabio",
    avatar: "https://github.com/fabioteraoka.png",
    "monthly-budget": 30000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
};

module.exports ={
    get(){
        return data;
    },
    update(newData){
        data=newData;
    }
}