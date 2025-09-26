
import React, { forwardRef } from 'react';
import Link from 'next/link';

type ReusableButtonProps = {
  as?: 'button' | 'a';
  children: React.ReactNode;
  className?: string;
  href?: string;
  [x: string]: any;
};

const ReusableButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ReusableButtonProps
>(({ as = 'button', children, className = '', href, ...rest }, ref) => {
  const combinedClassName = `btn-secondary text-grey ${className}`;

  // If it's a link, decide whether it's for navigation or download
  if (as === 'a' && href) {
    // If 'download' prop exists, it's a download link. Use a plain <a> tag.
    if (rest.download) {
      return (
        <a href={href} className={combinedClassName} {...rest} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </a>
      );
    }

    // Otherwise, it's a navigation link. Use Next.js Link.
    return (
      <Link href={href} className={combinedClassName} {...rest}>
        {children}
      </Link>
    );
  }

  // Fallback for <a> without href (less common)
  if (as === 'a') {
    return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={combinedClassName} {...rest}>
          {children}
        </a>
    );
  }

  // Default to a button
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </button>
  );
});

ReusableButton.displayName = 'ReusableButton';

export default ReusableButton;
