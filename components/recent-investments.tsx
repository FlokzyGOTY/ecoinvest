import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Investment } from "@/app/investments/columns"

export function RecentInvestments({ investments }: { investments: Investment[] }) {
  if (investments.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="text-center">
          <p className="text-muted-foreground">Keine Investitionen vorhanden</p>
          <p className="text-sm text-muted-foreground mt-1">
            Fügen Sie Ihre erste Investition hinzu, um sie hier zu sehen
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {investments.slice(0, 5).map((investment) => (
        <div key={investment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{investment.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{investment.name}</p>
            <p className="text-sm text-muted-foreground">{investment.type}</p>
          </div>
          <div className="ml-auto font-medium">+€{investment.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

