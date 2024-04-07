interface BreadCrumbListType {
  title: string;
  path: string;
}

export function generateBreadCrumbList(items: BreadCrumbListType[]) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      item: item.path,
    })),
  };

  return JSON.stringify(breadcrumbList);
}
