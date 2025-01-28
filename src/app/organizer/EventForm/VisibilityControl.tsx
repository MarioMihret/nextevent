import React from 'react';
import { Eye, Clock } from 'lucide-react';

interface VisibilityControlProps {
  isVisible: boolean;
  scheduledDate: string;
  onVisibilityChange: (isVisible: boolean) => void;
  onScheduleChange: (date: string) => void;
}

const VisibilityControl: React.FC<VisibilityControlProps> = ({
  isVisible,
  scheduledDate,
  onVisibilityChange,
  onScheduleChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Visibility</h3>
      
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="visibility"
            checked={isVisible}
            onChange={() => onVisibilityChange(true)}
            className="text-purple-600"
          />
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visible Immediately
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="visibility"
            checked={!isVisible}
            onChange={() => onVisibilityChange(false)}
            className="text-purple-600"
          />
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Schedule Visibility
          </span>
        </label>
      </div>

      {!isVisible && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Show event from:
          </label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => onScheduleChange(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-white"
          />
        </div>
      )}
    </div>
  );
}

export default VisibilityControl;