import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface UtilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  price: string;
  onLearnMore: () => void;
}

export default function UtilityCard({ 
  icon: Icon, 
  title, 
  description, 
  category, 
  price,
  onLearnMore 
}: UtilityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Badge variant={price === "Free" ? "secondary" : "default"}>
            {price}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{category}</Badge>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onLearnMore}
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
