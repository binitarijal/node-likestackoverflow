module.exports=(sequelize,DataTypes)=>{
    const Answer=sequelize.define("answer",{
        answertext:{
            type:DataTypes.STRING,
            allowNull:false,
        },
     
    })
    return Answer;
}