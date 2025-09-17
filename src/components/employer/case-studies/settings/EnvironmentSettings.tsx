import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { 
  Monitor,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Environment {
  id: string;
  name: string;
  runtime: string;
  imageTag: string;
  createdBy: string;
  resourceLimits: {
    cpu: string;
    memory: string;
  };
  status: 'Healthy' | 'Unhealthy';
  version: string;
  isDefault: boolean;
  lastHealthCheck: string;
}

const mockEnvironments: Environment[] = [
  {
    id: 'ENV-001',
    name: 'Node.js 18 LTS',
    runtime: 'Node.js',
    imageTag: 'node:18-slim',
    createdBy: 'System Admin',
    resourceLimits: {
      cpu: '2 cores',
      memory: '4GB'
    },
    status: 'Healthy',
    version: '18.17.0',
    isDefault: true,
    lastHealthCheck: '2025-07-28 08:00'
  },
  {
    id: 'ENV-002',
    name: 'Python 3.11 Data Science',
    runtime: 'Python',
    imageTag: 'python:3.11-slim',
    createdBy: 'Emily Davis',
    resourceLimits: {
      cpu: '4 cores',
      memory: '8GB'
    },
    status: 'Healthy',
    version: '3.11.4',
    isDefault: false,
    lastHealthCheck: '2025-07-28 08:00'
  },
  {
    id: 'ENV-003',
    name: 'Docker Microservices',
    runtime: 'Docker',
    imageTag: 'docker:20.10-dind',
    createdBy: 'Alex Johnson',
    resourceLimits: {
      cpu: '4 cores',
      memory: '16GB'
    },
    status: 'Unhealthy',
    version: '20.10.17',
    isDefault: false,
    lastHealthCheck: '2025-07-27 23:45'
  }
];

export function EnvironmentSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Monitor className="h-5 w-5 mr-2" />
            Execution Environments
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Environment
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockEnvironments.map((env) => (
            <div key={env.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium">{env.name}</h4>
                    {env.isDefault && (
                      <Badge variant="default">Default</Badge>
                    )}
                    <Badge variant={env.status === 'Healthy' ? 'default' : 'destructive'}>
                      {env.status === 'Healthy' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {env.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Runtime:</span>
                      <span className="ml-2 font-medium">{env.runtime} {env.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Image:</span>
                      <span className="ml-2 font-mono text-xs">{env.imageTag}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">CPU:</span>
                      <span className="ml-2 font-medium">{env.resourceLimits.cpu}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Memory:</span>
                      <span className="ml-2 font-medium">{env.resourceLimits.memory}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created by:</span>
                      <span className="ml-2 font-medium">{env.createdBy}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Check:</span>
                      <span className="ml-2 font-medium">{env.lastHealthCheck}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 ml-4">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}