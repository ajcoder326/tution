import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '../ui/Button';

interface RequestStatusProps {
  status: 'pending' | 'accepted' | 'rejected';
  onAccept?: () => void;
  onReject?: () => void;
  isLoading?: boolean;
}

const RequestStatus = ({ status, onAccept, onReject, isLoading }: RequestStatusProps) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      text: 'Pending Response',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    accepted: {
      icon: CheckCircle,
      text: 'Accepted',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    rejected: {
      icon: XCircle,
      text: 'Rejected',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} p-4 rounded-lg`}>
      <div className="flex items-center mb-4">
        <Icon className={`w-5 h-5 ${config.color} mr-2`} />
        <span className={`font-semibold ${config.color}`}>{config.text}</span>
      </div>

      {status === 'pending' && onAccept && onReject && (
        <div className="flex space-x-4">
          <Button
            onClick={onAccept}
            isLoading={isLoading}
            variant="primary"
            className="flex-1"
          >
            Accept
          </Button>
          <Button
            onClick={onReject}
            isLoading={isLoading}
            variant="secondary"
            className="flex-1"
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};