export default function GlowOrbs() {
  return (
    <>
      <div className="glow-orb-1 absolute top-[-10%] left-[10%] w-[600px] h-[500px] rounded-full bg-violet/8 blur-[120px]" />
      <div className="glow-orb-2 absolute top-[20%] right-[-5%] w-[500px] h-[400px] rounded-full bg-teal/8 blur-[100px]" />
      <div className="glow-orb-3 absolute bottom-[10%] left-[30%] w-[700px] h-[400px] rounded-full bg-rose/6 blur-[130px]" />
      <div className="glow-orb-2 absolute top-[50%] left-[5%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[90px]" style={{ animationDelay: "-6s" }} />
      <div className="glow-orb-1 absolute bottom-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-violet/6 blur-[110px]" style={{ animationDelay: "-10s" }} />
    </>
  );
}