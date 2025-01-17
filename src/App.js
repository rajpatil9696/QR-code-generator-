import { useState } from 'react';
import './App.css';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import QRCode from 'qrcode'
import { Card } from 'primereact/card';
        
function App() {
  const [query,setQuery]=useState("");
  const[qrUrl,setQrUrl]=useState("");

  const genetateQrCode= async()=>{
      try{
          const dataUrl= await QRCode.toDataURL(query);
          setQrUrl(dataUrl)
      }catch(e){
        console.log(e);
      }
  }
  const downloadQrCode=()=>{
    try{
        const link = document.createElement('a');
        link.href=qrUrl;
        link.download=encodeURIComponent('qrcode');
        link.style.display="none"

        link.click()

        document.body.removeChild(link);
    }catch(e){
        console.error(e);
    }
  }
  return (
    <div className="App">
     <h1>QR CODE GENERATOR</h1>
     <div className="card flex justify-content-center">
            <InputTextarea autoResize value={query} onChange={(e) => setQuery(e.target.value)} rows={5} cols={30} />
        </div>
        <br></br>
        <Button label="Generate QR Code " onClick={genetateQrCode} />

        {
          qrUrl.length?(
            <>
             <Card title="YOUR QR CODE IS HERE" style={{minWidth:'20vw',width:'fit-content',margin:'10vh auto'}}>
                <img src={qrUrl} alt='qucode' width={300}></img>
            </Card>
            <br></br>
            <Button label='Download' onClick={downloadQrCode}></Button>

            </>
          ): ""
        }
    </div>
  );
}

export default App;
