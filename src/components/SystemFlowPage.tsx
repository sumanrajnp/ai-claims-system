import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SystemFlowViewer } from "./SystemFlowViewer";
import { 
  Network, 
  Search, 
  Download, 
  Maximize2,
  Info,
  FileImage
} from "lucide-react";

export const SystemFlowPage = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <Network className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">System Flow Diagram</h1>
              <p className="text-muted-foreground">
                Visual representation of the AI-powered claims processing workflow
              </p>
            </div>
          </div>
        </div>

        {/* Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This diagram illustrates the complete flow of how claims are processed through our AI-powered system, 
              from initial submission to final settlement. Understanding this flow helps stakeholders visualize 
              the entire process and identify optimization opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Input Processing</h4>
                <p className="text-sm text-blue-700">
                  Claims submitted via email, portal, chat, or API are automatically processed
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">AI Analysis</h4>
                <p className="text-sm text-green-700">
                  OCR and NLP technologies extract structured data from documents and emails
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Compliance & Settlement</h4>
                <p className="text-sm text-purple-700">
                  Automated verification followed by manual review and final settlement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagram Display Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5 text-green-600" />
              Flow Diagram
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Container with Background Image */}
            <div className="relative aspect-video bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden">
              {/* Background Image */}
              <img
                src="/systemflow.png"
                alt="System Flow Diagram"
                className="w-full h-full object-contain bg-white"
              />
              
              {/* Overlay with Interactive Button */}
              <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Interactive View
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Click below to open the advanced viewer with zoom, pan, and fullscreen features
                  </p>
                  <Button 
                    onClick={() => setIsViewerOpen(true)}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Open Interactive Viewer
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Maximize2 className="h-3 w-3" />
                Fullscreen Support
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Search className="h-3 w-3" />
                Zoom & Pan
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                Download Available
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Navigation Controls</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Mouse wheel to zoom in/out
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Click and drag to pan around
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Reset button to return to original view
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Keyboard Shortcuts</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F</kbd> Toggle fullscreen
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd> Close viewer
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">0</kbd> Reset view
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Flow Viewer Modal */}
      <SystemFlowViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
      />
    </div>
  );
}; 