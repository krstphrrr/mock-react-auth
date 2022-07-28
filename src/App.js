import React, { 
  useEffect, 
  useState
 } from "react";
// import Button from '@mui/material/Button';
import LoginButton from './auth/login';
import LogoutButton from './auth/logout';
import { useAuth0 } from "@auth0/auth0-react"
import './App.css';
import jwtok from 'jsonwebtoken';

function App() {

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "dev-mg6fdv6o.auth0.com";
  
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: "read:current_user",
  //       });
  
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  
  //       const { user_metadata } = await metadataResponse.json();
  
  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  
  //   getUserMetadata();
  // }, [getAccessTokenSilently, user.sub]);

  async function getProtectedRoute(){ 
    // const domain = "dev-mg6fdv6o.auth0.com";
    try{
      const accessToken = await getAccessTokenSilently();
   
      let decoded = await jwtok.decode(accessToken)
      console.log({"token": await accessToken}) // decode on jwt.io to check validity of token
      user['permissions'] = decoded.permissions // added to user object 
      console.log(decoded.permissions)

      let response
      let permissions = decoded.permissions
//  IF USER ONLY HAS NDOW
      if(
          permissions.includes('read:NDOW') && 
          !permissions.includes('read:NWERN') &&
          !permissions.includes('read:RHEM')
        ){
          console.log('NDOW')
          response = await fetch('http://localhost:5001/api/ndow',{
              method: "put",
              headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                data: {
                  "primaryKeys": ["17101012114127892017-09-01"]
                }
              }), 
              
            })
// IF USER HAS PERMISSIONS: NWERN
          } else if(
              !permissions.includes('read:NDOW') && 
              permissions.includes('read:NWERN') &&
              !permissions.includes('read:RHEM')
          ){
            console.log('NWERN')
            response = await fetch('http://localhost:5001/api/nwern',{
              method: "put",
              headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                data: {
                  "primaryKeys": ["17101012114127892017-09-01"]
                }
              }), 
              
            })
// IF USER HAS PERMISSIONS: RHEM
          } else if(
            !permissions.includes('read:NDOW') && 
            !permissions.includes('read:NWERN') &&
            permissions.includes('read:RHEM')
        ){
          console.log('RHEM')
          response = await fetch('http://localhost:5001/api/rhem',{
            method: "put",
            headers: {
              'authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              data: {
                "primaryKeys": ["17101012114127892017-09-01"]
              }
            }), 
            
          })
// START OF DUAL COMBINATIONS
// IF USER HAS PERMISSIONS: NDOW + NWERN
        } else if(
          permissions.includes('read:NDOW') && 
          permissions.includes('read:NWERN') &&
          !permissions.includes('read:RHEM')
      ){
        console.log('NDOW NWERN')
        response = await fetch('http://localhost:5001/api/ndow-nwern',{
          method: "put",
          headers: {
            'authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            data: {
              "primaryKeys": ["17101012114127892017-09-01"]
            }
          }), 
        })
// IF USER HAS PERMISSIONS: NDOW + RHEM
        } else if(
          permissions.includes('read:NDOW') && 
          !permissions.includes('read:NWERN') &&
          permissions.includes('read:RHEM')
        ){
        console.log('NDOW RHEM')
        response = await fetch('http://localhost:5001/api/ndow-rhem',{
          method: "put",
          headers: {
            'authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            data: {
              "primaryKeys": ["17101012114127892017-09-01"]
            }
          }), 
        })
// IF USER HAS PERMISSIONS: NWERN + RHEM
        } else if(
          !permissions.includes('read:NDOW') && 
          permissions.includes('read:NWERN') &&
          permissions.includes('read:RHEM')
        ){
        console.log('RHEM NWERN')
        response = await fetch('http://localhost:5001/api/nwern-rhem',{
          method: "put",
          headers: {
            'authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            data: {
              "primaryKeys": ["17101012114127892017-09-01"]
            }
          }), 
        })
// START OF ALL 3 PERMISSIONS
// IF USER HAS PERMISSIONS: NDOW + RHEM + NWERN
        } else if(
          permissions.includes('read:NDOW') && 
          permissions.includes('read:NWERN') &&
          permissions.includes('read:RHEM')
        ){
        console.log('NDOW NWERN RHEM')
        response = await fetch('http://localhost:5001/api/ndow-nwern-rhem',{
          method: "put",
          headers: {
            'authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            data: {
              "primaryKeys": ["17101012114127892017-09-01"]
            }
          }), 
        })
        } else {
          response = await fetch('http://localhost:5001/api/unrestricted',{
            method: "put"
          }, {
              data: {
                "primaryKeys": ["17101012114127892017-09-01"]
              }
            }, {
              headers:{
                authorization: `Bearer ${accessToken}`
              }
            })
          console.log("no permissions")
        }

    } catch(error){
      console.log("ERRRORRRRR")
      console.log(error.message)
    }
    
  }
  // async function getUserInfo(){
  //   try{
  //     const token = await getAccessTokenSilently()
  //     const response = await axios.get(`https://{}.auth0.com/api/v2/users/${user.sub}`,{
  //       headers:{
  //         authorization: `Bearer ${token}`
  //       }
  //     })
  //     console.log(response.data)


  //   } catch(error){
      
  //     console.log(error.message)
  //   }
  // }

  if (isAuthenticated){
    return (

      <div className="App">
        <h1>User logged in </h1>
          <button variant="text" 
            onClick={getProtectedRoute}
            // onClick={getUserInfo}
            >
              Fetch
            </button>
            <LogoutButton></LogoutButton>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h3>User Metadata</h3>
              {user ? (
                <pre>{JSON.stringify(user, null, 2)}</pre>
              ) : (
                "No user metadata defined"
              )}
            </div>)
  }

  return (
  <div className='App'>
    <h1>User logged out</h1>
    <LoginButton></LoginButton>
  </div>
    

  )
}

export default App;
