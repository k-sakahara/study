class Team{
  constructor(name){
      this.teamName = name;
      this.members = [];
  }
  getName(){
    return this.teamname;
  }
  getMembers(){
    return this.members;
  }
  pushMembers(member_arg){
    this.members.push(member_arg);
    return 0;
  }
}

document.addEventListener("click",function(){
  console.log("testing");
  elm3.value = elm1.value + elm2.value
});
