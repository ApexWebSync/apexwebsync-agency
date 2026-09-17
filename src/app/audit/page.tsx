import SeoAuditTool from '@/components/SeoAuditTool';

export const metadata = {
  title: 'Free Live SEO & Speed Audit | ApexWebSync India',
  description:
    'Test your website speed, SSL security, mobile friendliness, and Google ranking readiness in real-time with ApexWebSync.',
};

export default function AuditPage() {
  return (
    <div className="pt-24 pb-20">
      <SeoAuditTool />
    </div>
  );
}
