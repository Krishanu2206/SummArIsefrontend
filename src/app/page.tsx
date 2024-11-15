import HeroSection from "@/components/custom/hero-section";
import { FeatureSection } from "@/components/custom/features-section";
import { getHomePageData } from "@/data/loaders";

const getstrapidata = async()=>{
  try {
    const data = await getHomePageData();
    console.dir(data, {depth : null});
    return data.data.blocks;
  } catch (error : any) {
    console.log(error);
  }
}


export default async function Home() {

  const blocks = await getstrapidata();
  console.log(blocks);

  const blockComponents = {
    "layout.hero-section": HeroSection,
    "layout.features-section": FeatureSection,
  };

  function blockRenderer(block: any) {
    const Component = blockComponents[block.__component as keyof typeof blockComponents];
    return Component ? <Component key={block.id} data={block} /> : null;
  }

  return (
    <main>
      {blocks.map(blockRenderer)}
    </main>
  );
}
