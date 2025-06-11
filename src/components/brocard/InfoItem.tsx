import React from 'react';

interface InfoItemProps {
  icon: React.ReactElement;
  text: string;
  href?: string;
}

export function InfoItem({ icon, text, href }: InfoItemProps) {
  const content = (
    <div className="flex items-center space-x-3 transition-colors duration-300 ease-in-out group">
      {React.cloneElement(icon, { className: "h-5 w-5 text-primary group-hover:text-accent-foreground" })}
      <span className="group-hover:text-accent-foreground">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-2 rounded-md hover:bg-primary hover:text-primary-foreground"
      >
        {content}
      </a>
    );
  }

  return <div className="p-2">{content}</div>;
}
