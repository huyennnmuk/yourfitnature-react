'use client';
import React, { RefObject } from 'react';
import ShareButton from './footerblog/ShareButton';
import ExportButton from './footerblog/ExportButton';
import Feedback from './footerblog/Feedback';
import CopyButton from './footerblog/CopyButton';
import MoreOptionsMenu from './footerblog/MoreOptionsMenu';

interface FooterActionsProps {
  contentHtml: string;
  blogId: string;
  contentRef: RefObject<HTMLElement>;
  sources?: string[];
  onReportFeedback: () => void;
}

const FooterActions: React.FC<FooterActionsProps> = ({ contentHtml, blogId, contentRef, sources, onReportFeedback }) => {

  return (
    <div className="flex items-center justify-between">
      <div className="-ml-sm gap-xs flex items-center">
        <ShareButton />
        <ExportButton contentHtml={contentHtml} title={blogId} contentRef={contentRef} />
      </div>
      <div className="gap-x-xs flex items-center">
        <Feedback blogId={blogId} />
        <CopyButton contentRef={contentRef} />
        <MoreOptionsMenu sources={sources} onReportFeedback={onReportFeedback} />
      </div>
    </div>
  );
};

export default FooterActions;