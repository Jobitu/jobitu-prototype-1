import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Plus,
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  Link,
  Video
} from "lucide-react";

interface CreateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAssessmentModal({ isOpen, onClose }: CreateAssessmentModalProps) {
  const [createStep, setCreateStep] = useState(1);

  const handleClose = () => {
    setCreateStep(1);
    onClose();
  };

  const handleNext = () => {
    if (createStep < 3) {
      setCreateStep(createStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    setCreateStep(Math.max(1, createStep - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Assessment - Step {createStep} of 3</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= createStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < createStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {createStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">General Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Assessment Title *</label>
                  <Input placeholder="e.g. Frontend Developer Assessment" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coding">Coding Challenge</SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                      <SelectItem value="design">Design Challenge</SelectItem>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea rows={3} placeholder="Describe what this assessment evaluates..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes) *</label>
                  <Input type="number" placeholder="120" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox id="start-from-library" />
                  <label htmlFor="start-from-library" className="text-sm">
                    Start from My Library template
                  </label>
                </div>
              </div>
            </div>
          )}

          {createStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Add Questions</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No questions added yet</p>
                <p className="text-sm">Click "Add Question" to get started</p>
              </div>
            </div>
          )}

          {createStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">Resources & Publish</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Additional Resources</label>
                <div className="flex gap-2 mb-3">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Add Video
                  </Button>
                </div>
                <Textarea placeholder="Instructions for candidates..." rows={3} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-save" defaultChecked />
                  <label htmlFor="auto-save" className="text-sm">Auto-save candidate answers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="preview" />
                  <label htmlFor="preview" className="text-sm">Allow candidates to preview before starting</label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={createStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext}>
              {createStep === 3 ? 'Publish Assessment' : 'Next'}
              {createStep < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}