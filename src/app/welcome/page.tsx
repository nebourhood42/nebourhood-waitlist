import Welcome from './components/Welcome'
import welcomeBg from "@/assets/imgs/welcombg.png"

const page = () => {
  return (
    <div className="w-screen min-h-screen overflow-y-auto"
    style={{
          backgroundImage: `url(${welcomeBg.src})`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'right top',
          backgroundSize: '100% auto',
    
        }}
    >
        <Welcome />
    </div>
  )
}

export default page