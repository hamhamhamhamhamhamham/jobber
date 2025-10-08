
// modern js!

const AUTH_API_URL = 'http://localhost:3000/graphql'

// JS  syntax different from gql! -> consider inner fn!!
const LOGIN_MUTATION = `
    mutation Login($loginDto:LoginDto!) {
        login(loginDto:$loginDto){
            id 
            email
        }
    }
`

const JOBS_API_URL = 'http://localhost:3001/graphql' 

const EXECUTE_JOB_MUTAION = `mutation ExecuteJob($executeJobDto:ExecuteJobDto!){
            executeJob(executeJobDto:$executeJobDto){
                name
            }    
}` 

async function sendRequestLogin(email,password){
    const response =await fetch(AUTH_API_URL,{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({
            query: LOGIN_MUTATION,
            variables: {loginDto:{email,password}}    
       }),
       
    })

    const loginResponse =await response.json()
    const cookie = response.headers.get("SeT-CooKIe") 

    console.log(loginResponse)
    return {
        loginResponse,
        cookie
    }

}

async function sendRequestJobs(name,data,cookie){
    const response = await fetch(JOBS_API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json",Cookie:cookie},
        body:JSON.stringify({
            query:EXECUTE_JOB_MUTAION,
            variables:{executeJobDto:{name,data}}
        }),

    })


    const JobsRes = await response.json()
    return {JobsRes}

}



(async()=>{

   const {loginResponse,cookie} =await sendRequestLogin("h@gmail.com" , "P@ssw0rd")


   if(loginResponse?.data.login.id){
        // 1000 messages
      const jobsData = Array.from({ length :1000 },()=>({
        iterations:Math.random()*1000
      }))

      console.log(jobsData)
      const {JobsRes}  =await sendRequestJobs("Fibonacci",jobsData,cookie)

      console.log("guess from client : ALL MESSAGES WERE CONSUMED > ",JobsRes?.data.executeJob.name)
   }else{

    console.log("LOGIN FAILED")

   }

})()
