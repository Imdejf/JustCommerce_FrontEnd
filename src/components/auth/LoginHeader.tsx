const AuthHeader: React.FC = () => {
  return (
    <header
      className='hidden md:flex min-h-1/4 flex-col gap-6 justify-center relative opacity-70 text-sm lg:text-sm leading-relaxed text-gray'
      style={{
        padding: '0 5vw',
      }}
    >
      <p>
        Rozwiązaniem dla większych wydawców, które zapewni im profesjonalną obsługę oraz pozwoli zaoszczędzić czas i
        pieniądze jest MagelUP! Dzięki wykorzystaniu tego systemu będą mogli regularnie maksymalizować swoje zyski i
        minimalizować koszty operacyjne, ponieważ uzyskają pełną kontrolę nad swoim wydawnictwem
      </p>
      <p>
        MagelUP zapewnia wydawcom sprawdzone moduły dystrybucyjne obejmujące kanały sprzedaży cyfrowej i fizycznej oraz
        integrację z zewnętrznymi kanałami dystrybucji. Otrzymują również moduł do profesjonalnego zarządzania
        katalogiem produktów Artystów oraz rozbudowany i skupiony wyłącznie na nich system rozliczeniowy, który poradzi
        sobie nawet z najbardziej skomplikowanymi umowami i danymi!
      </p>
    </header>
  );
};

export default AuthHeader;
