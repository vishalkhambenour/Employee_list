import React from 'react'

function Routerss() {
  return (
    <div>
    <Routes>
    <Route path="/" element={token?<Home />:<Login/>}/>
    <Route path="/createemployee" element={token ? <Createemployeelist/>: <Login/> } />
    <Route path="/employeelist" element={token ? <Employeelist/> : <Login/> } />
    <Route path="/login" element= {<Login/>}/>
    <Route path="/signup" element= {<Signup/>}/>
  </Routes>
    </div>
  )
}

export default Routerss