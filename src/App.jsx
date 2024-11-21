import Background from "./assets/bg.webp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

function App() {

  const [currentDate, setCurrentDate] = useState('');

  const onSubmit = (data) => {
    data.preventDefault()
    let searchEngine = '';

    switch (data.target.engine.value) {
      case 'google':
          searchEngine = 'https://www.google.com/search?q='
        break
      case 'bing':
          searchEngine = 'https://www.bing.com/search?q='
        break
      case 'yahoo':
          searchEngine = 'https://search.yahoo.com/search?p='
        break
      case 'duckduckgo':
          searchEngine = 'https://duckduckgo.com/?q='
        break
      default:
          searchEngine = 'https://www.google.com/search?q='
        break
    }

    window.open(searchEngine + data.target.search.value, '_self')
  }

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
      };
      setCurrentDate(now.toLocaleString('en-PH', options));
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen bg-cover bg-center mix-blend-normal overflow-hidden flex flex-col gap-10 justify-center" style={{backgroundImage: `url(${Background})`}} >
        <div className=" text-white flex justify-center font-silkscreen text-7xl">
          Hi, Peter Parker
        </div>
        <div className=" text-white flex justify-center font-silkscreen text-3xl">
          {currentDate}
        </div>
        <div className="flex flex-row justify-center items-end pt-32">
          <form onSubmit={onSubmit} className="flex flex-row justify-center items-end gap-2">
            <Select id="engine" name="engine" className="">
              <SelectTrigger SelectTrigger className="w-[180px] bg-background text-black h-10">
                <SelectValue placeholder="google" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">google</SelectItem>
                <SelectItem value="bing">bing</SelectItem>
                <SelectItem value="yahoo">yahoo</SelectItem>
                <SelectItem value="duckduckgo">duckduckgo</SelectItem>
              </SelectContent>
            </Select>
            <Input id='search' name="search" placeholder="Search..." className="bg-background text-black text-3xl h-10 border-none px-4 py-2 w-96" />
            <Button type="submit" className="bg-background text-black h-10 hover:bg-background/70">Search</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
