import { useEffect } from 'react';
import { localBusinessSchema, professionalServiceSchema } from '@/lib/schema';

export default function SchemaMarkup() {
  useEffect(() => {
    // Adicionar LocalBusiness Schema
    const localBusinessScript = document.createElement('script');
    localBusinessScript.type = 'application/ld+json';
    localBusinessScript.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(localBusinessScript);

    // Adicionar ProfessionalService Schema
    const professionalServiceScript = document.createElement('script');
    professionalServiceScript.type = 'application/ld+json';
    professionalServiceScript.textContent = JSON.stringify(professionalServiceSchema);
    document.head.appendChild(professionalServiceScript);

    return () => {
      document.head.removeChild(localBusinessScript);
      document.head.removeChild(professionalServiceScript);
    };
  }, []);

  return null;
}
