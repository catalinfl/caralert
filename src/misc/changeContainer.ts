import { FuncHandler, MenuHandler } from "@/app/main/page"

export const changeContainer: FuncHandler['changeContainer'] = (container: MenuHandler, id: string | null) => {
    switch (container) {
      case "principal": {
        window.location.href="/main"
        break
      }
      case "add": {
        window.location.href="/add"
        break
      }
      case "expires": {
        window.location.href="/main"
        break
      }
      case "car": {
        window.location.href="/main"
        break
      }
    }
  }