module.exports=(sequelize,DataTypes)=>{
    const answer=sequelize.define("answer",{
        answertext:{
            type:DataTypes.STRING,
            allowNull:false,
        },
     
    })
    return answer;
}