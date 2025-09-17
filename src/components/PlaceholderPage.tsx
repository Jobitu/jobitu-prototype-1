interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  description: string;
  comingSoon?: boolean;
}

export function PlaceholderPage({ title, subtitle, description, comingSoon = false }: PlaceholderPageProps) {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{subtitle}</h3>
          <p className="text-gray-600">{description}</p>
          <p className="text-sm text-gray-500 mt-2">
            This feature will be implemented {comingSoon ? 'soon' : 'in the next iteration'}.
          </p>
        </div>
      </div>
    </div>
  );
}