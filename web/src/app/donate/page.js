import DonateForm from '@/components/DonateForm';
import { PageHead, SectionHead } from '@/components/ui';
import { getBlock, listOf } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';

export const revalidate = 60;

export async function generateMetadata() {
  const head = await getBlock('donate.head');

  return pageMetadata({
    title: head.title,
    description: head.lead,
    path: '/donate',
  });
}

const DonatePage = async () => {
  const head = await getBlock('donate.head');
  const settings = await getBlock('donate.settings');
  const amounts = listOf(settings, 'amounts');
  const methods = listOf(settings, 'methods');

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell shell--narrow">
          <div className="donate-card">
            <SectionHead align="center" title={settings.cardTitle} />

            <DonateForm settings={settings} amounts={amounts} methods={methods} />
          </div>
        </div>
      </section>
    </>
  );
};

export default DonatePage;
