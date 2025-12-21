import { Toaster } from "react-hot-toast"
import AppRoutes from "./app.routes"


function App() {
  return (
    <div>
    
      <AppRoutes />
      <Toaster position="top-center" toastOptions={{ 
        style: {
          background: "#ddd",
          padding: "14px",
          borderRadius: "5px"
        }
      }}/>
    </div>
  )
}

export default App
