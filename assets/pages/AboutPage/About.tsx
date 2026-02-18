import ParallaxSection from '../../components/ParallaxSection';
import ScrollText from '../../components/ScrollText';

const About = () => {
  let images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  ];

  images = [...images, ...[...Array(30)].map((_, i) => `https://mdbcdn.b-cdn.net/img/new/slides/0${i + 50}.webp`)];
  return (
    <>
      <title>page of about</title>
      <ScrollText animationType={'fadeIn'} text={`
        天 地 玄 黄，宇 宙 洪 荒。日 月 盈 昃，辰 宿 列 张。寒 来 暑 往，秋 收 冬 藏。闰 馀 成 岁，律 吕 调 阳。云 腾 致 雨，露 结 为 霜。金 生 丽 水，玉 出 昆 冈。剑 号 巨 阙，珠 称 夜 光。果 珍 李 柰，菜 重 芥 姜。海 咸 河 淡，鳞 潜 羽 翔。龙 师 火 帝，鸟 官 人 皇。始 制 文 字，乃 服 衣 裳。推 位 让 国，有 虞 陶 唐。吊 民 伐 罪，周 发 殷 汤。坐 朝 问 道，垂 拱 平 章。爱 育 黎 首，臣 伏 戎 羌。遐 迩 一 体，率 宾 归 王。鸣 凤 在 竹，白 驹 食 场。化 被 草 木，赖 及 万 方。 
        `} />
      <ParallaxSection images={images} />
    </>
  );
};
export default About;