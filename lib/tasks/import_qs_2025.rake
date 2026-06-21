namespace :import do
  desc 'Import QS 2025 Top 100 global university rankings (accurate data)'
  task qs_2025: :environment do
    qs_year = 2025

    # Ensure all needed regions exist
    regions = {
      '北美' => Region.find_or_create_by!(name: '北美'),
      '欧洲' => Region.find_or_create_by!(name: '欧洲'),
      '澳洲' => Region.find_or_create_by!(name: '澳洲'),
      '香港' => Region.find_or_create_by!(name: '香港'),
      '台湾' => Region.find_or_create_by!(name: '台湾'),
      '亚洲' => Region.find_or_create_by!(name: '亚洲'),
      '南美' => Region.find_or_create_by!(name: '南美'),
    }

    # QS World University Rankings 2025 — COMPLETE Top 100
    # Data source: https://www.topuniversities.com/world-university-rankings/2025
    QS_2025_TOP100 = [
      # === 🇺🇸 USA (北美) ===
      { rank: 1,  name: '麻省理工学院 (Massachusetts Institute of Technology)', state: 'MA', city: 'Cambridge', website: 'https://www.mit.edu', region: '北美' },
      { rank: 4,  name: '哈佛大学 (Harvard University)', state: 'MA', city: 'Cambridge', website: 'https://www.harvard.edu', region: '北美' },
      { rank: 6,  name: '斯坦福大学 (Stanford University)', state: 'CA', city: 'Stanford', website: 'https://www.stanford.edu', region: '北美' },
      { rank: 10, name: '加州理工学院 (California Institute of Technology)', state: 'CA', city: 'Pasadena', website: 'https://www.caltech.edu', region: '北美' },
      { rank: 11, name: '宾夕法尼亚大学 (University of Pennsylvania)', state: 'PA', city: 'Philadelphia', website: 'https://www.upenn.edu', region: '北美' },
      { rank: 12, name: '加州大学伯克利分校 (University of California, Berkeley)', state: 'CA', city: 'Berkeley', website: 'https://www.berkeley.edu', region: '北美' },
      { rank: 16, name: '康奈尔大学 (Cornell University)', state: 'NY', city: 'Ithaca', website: 'https://www.cornell.edu', region: '北美' },
      { rank: 21, name: '芝加哥大学 (University of Chicago)', state: 'IL', city: 'Chicago', website: 'https://www.uchicago.edu', region: '北美' },
      { rank: 22, name: '普林斯顿大学 (Princeton University)', state: 'NJ', city: 'Princeton', website: 'https://www.princeton.edu', region: '北美' },
      { rank: 23, name: '耶鲁大学 (Yale University)', state: 'CT', city: 'New Haven', website: 'https://www.yale.edu', region: '北美' },
      { rank: 32, name: '约翰霍普金斯大学 (Johns Hopkins University)', state: 'MD', city: 'Baltimore', website: 'https://www.jhu.edu', region: '北美' },
      { rank: 34, name: '哥伦比亚大学 (Columbia University)', state: 'NY', city: 'New York', website: 'https://www.columbia.edu', region: '北美' },
      { rank: 42, name: '加州大学洛杉矶分校 (University of California, Los Angeles)', state: 'CA', city: 'Los Angeles', website: 'https://www.ucla.edu', region: '北美' },
      { rank: 43, name: '纽约大学 (New York University)', state: 'NY', city: 'New York', website: 'https://www.nyu.edu', region: '北美' },
      { rank: 44, name: '密歇根大学安娜堡分校 (University of Michigan-Ann Arbor)', state: 'MI', city: 'Ann Arbor', website: 'https://www.umich.edu', region: '北美' },
      { rank: 50, name: '西北大学 (Northwestern University)', state: 'IL', city: 'Evanston', website: 'https://www.northwestern.edu', region: '北美' },
      { rank: 58, name: '卡内基梅隆大学 (Carnegie Mellon University)', state: 'PA', city: 'Pittsburgh', website: 'https://www.cmu.edu', region: '北美' },
      { rank: 61, name: '杜克大学 (Duke University)', state: 'NC', city: 'Durham', website: 'https://www.duke.edu', region: '北美' },
      { rank: 66, name: '德克萨斯大学奥斯汀分校 (University of Texas at Austin)', state: 'TX', city: 'Austin', website: 'https://www.utexas.edu', region: '北美' },
      { rank: 69, name: '伊利诺伊大学香槟分校 (University of Illinois at Urbana-Champaign)', state: 'IL', city: 'Champaign', website: 'https://www.illinois.edu', region: '北美' },
      { rank: 72, name: '加州大学圣地亚哥分校 (University of California, San Diego)', state: 'CA', city: 'San Diego', website: 'https://www.ucsd.edu', region: '北美' },
      { rank: 76, name: '华盛顿大学 (University of Washington)', state: 'WA', city: 'Seattle', website: 'https://www.washington.edu', region: '北美' },
      { rank: 79, name: '布朗大学 (Brown University)', state: 'RI', city: 'Providence', website: 'https://www.brown.edu', region: '北美' },
      { rank: 89, name: '宾夕法尼亚州立大学 (Pennsylvania State University)', state: 'PA', city: 'University Park', website: 'https://www.psu.edu', region: '北美' },
      { rank: 89, name: '普渡大学 (Purdue University)', state: 'IN', city: 'West Lafayette', website: 'https://www.purdue.edu', region: '北美' },

      # === 🇨🇦 Canada (北美) ===
      { rank: 25, name: '多伦多大学 (University of Toronto)', state: 'ON', city: 'Toronto', website: 'https://www.utoronto.ca', region: '北美' },
      { rank: 29, name: '麦吉尔大学 (McGill University)', state: 'QC', city: 'Montreal', website: 'https://www.mcgill.ca', region: '北美' },
      { rank: 38, name: '不列颠哥伦比亚大学 (University of British Columbia)', state: 'BC', city: 'Vancouver', website: 'https://www.ubc.ca', region: '北美' },
      { rank: 96, name: '阿尔伯塔大学 (University of Alberta)', state: 'AB', city: 'Edmonton', website: 'https://www.ualberta.ca', region: '北美' },

      # === 🇬🇧 UK (欧洲) ===
      { rank: 2,  name: '帝国理工学院 (Imperial College London)', state: 'England', city: 'London', website: 'https://www.imperial.ac.uk', region: '欧洲' },
      { rank: 3,  name: '牛津大学 (University of Oxford)', state: 'England', city: 'Oxford', website: 'https://www.ox.ac.uk', region: '欧洲' },
      { rank: 5,  name: '剑桥大学 (University of Cambridge)', state: 'England', city: 'Cambridge', website: 'https://www.cam.ac.uk', region: '欧洲' },
      { rank: 9,  name: '伦敦大学学院 (University College London)', state: 'England', city: 'London', website: 'https://www.ucl.ac.uk', region: '欧洲' },
      { rank: 27, name: '爱丁堡大学 (The University of Edinburgh)', state: 'Scotland', city: 'Edinburgh', website: 'https://www.ed.ac.uk', region: '欧洲' },
      { rank: 34, name: '曼彻斯特大学 (The University of Manchester)', state: 'England', city: 'Manchester', website: 'https://www.manchester.ac.uk', region: '欧洲' },
      { rank: 40, name: '伦敦国王学院 (King\'s College London)', state: 'England', city: 'London', website: 'https://www.kcl.ac.uk', region: '欧洲' },
      { rank: 50, name: '伦敦政治经济学院 (London School of Economics and Political Science)', state: 'England', city: 'London', website: 'https://www.lse.ac.uk', region: '欧洲' },
      { rank: 54, name: '布里斯托大学 (University of Bristol)', state: 'England', city: 'Bristol', website: 'https://www.bristol.ac.uk', region: '欧洲' },
      { rank: 69, name: '华威大学 (The University of Warwick)', state: 'England', city: 'Coventry', website: 'https://www.warwick.ac.uk', region: '欧洲' },
      { rank: 78, name: '格拉斯哥大学 (University of Glasgow)', state: 'Scotland', city: 'Glasgow', website: 'https://www.gla.ac.uk', region: '欧洲' },
      { rank: 80, name: '伯明翰大学 (University of Birmingham)', state: 'England', city: 'Birmingham', website: 'https://www.birmingham.ac.uk', region: '欧洲' },
      { rank: 80, name: '南安普顿大学 (University of Southampton)', state: 'England', city: 'Southampton', website: 'https://www.southampton.ac.uk', region: '欧洲' },
      { rank: 82, name: '利兹大学 (University of Leeds)', state: 'England', city: 'Leeds', website: 'https://www.leeds.ac.uk', region: '欧洲' },
      { rank: 89, name: '杜伦大学 (Durham University)', state: 'England', city: 'Durham', website: 'https://www.durham.ac.uk', region: '欧洲' },

      # === 🇨🇭 Switzerland (欧洲) ===
      { rank: 7,  name: '苏黎世联邦理工学院 (ETH Zurich)', state: 'Zurich', city: 'Zurich', website: 'https://www.ethz.ch', region: '欧洲' },
      { rank: 26, name: '洛桑联邦理工学院 (École Polytechnique Fédérale de Lausanne)', state: 'Vaud', city: 'Lausanne', website: 'https://www.epfl.ch', region: '欧洲' },

      # === 🇫🇷 France (欧洲) ===
      { rank: 24, name: '巴黎文理研究大学 (Université PSL)', state: 'Île-de-France', city: 'Paris', website: 'https://www.psl.eu', region: '欧洲' },
      { rank: 46, name: '巴黎理工学院 (Institut Polytechnique de Paris)', state: 'Île-de-France', city: 'Palaiseau', website: 'https://www.ip-paris.fr', region: '欧洲' },
      { rank: 63, name: '索邦大学 (Sorbonne University)', state: 'Île-de-France', city: 'Paris', website: 'https://www.sorbonne-universite.fr', region: '欧洲' },
      { rank: 73, name: '巴黎萨克雷大学 (Université Paris-Saclay)', state: 'Île-de-France', city: 'Gif-sur-Yvette', website: 'https://www.universite-paris-saclay.fr', region: '欧洲' },

      # === 🇩🇪 Germany (欧洲) ===
      { rank: 28, name: '慕尼黑工业大学 (Technical University of Munich)', state: 'Bavaria', city: 'Munich', website: 'https://www.tum.de', region: '欧洲' },
      { rank: 59, name: '慕尼黑大学 (LMU Munich)', state: 'Bavaria', city: 'Munich', website: 'https://www.lmu.de', region: '欧洲' },
      { rank: 84, name: '海德堡大学 (Heidelberg University)', state: 'Baden-Württemberg', city: 'Heidelberg', website: 'https://www.uni-heidelberg.de', region: '欧洲' },
      { rank: 97, name: '柏林自由大学 (Free University of Berlin)', state: 'Berlin', city: 'Berlin', website: 'https://www.fu-berlin.de', region: '欧洲' },
      { rank: 99, name: '亚琛工业大学 (RWTH Aachen University)', state: 'North Rhine-Westphalia', city: 'Aachen', website: 'https://www.rwth-aachen.de', region: '欧洲' },

      # === 🇳🇱 Netherlands (欧洲) ===
      { rank: 49, name: '代尔夫特理工大学 (Delft University of Technology)', state: 'South Holland', city: 'Delft', website: 'https://www.tudelft.nl', region: '欧洲' },
      { rank: 55, name: '阿姆斯特丹大学 (University of Amsterdam)', state: 'North Holland', city: 'Amsterdam', website: 'https://www.uva.nl', region: '欧洲' },

      # === 🇸🇪 Sweden (欧洲) ===
      { rank: 74, name: '瑞典皇家理工学院 (KTH Royal Institute of Technology)', state: 'Stockholm', city: 'Stockholm', website: 'https://www.kth.se', region: '欧洲' },
      { rank: 75, name: '隆德大学 (Lund University)', state: 'Skåne', city: 'Lund', website: 'https://www.lunduniversity.lu.se', region: '欧洲' },

      # === 🇧🇪 Belgium (欧洲) ===
      { rank: 63, name: '鲁汶大学 (KU Leuven)', state: 'Flanders', city: 'Leuven', website: 'https://www.kuleuven.be', region: '欧洲' },

      # === 🇮🇪 Ireland (欧洲) ===
      { rank: 87, name: '都柏林圣三一学院 (Trinity College Dublin)', state: 'Leinster', city: 'Dublin', website: 'https://www.tcd.ie', region: '欧洲' },

      # === 🇩🇰 Denmark (欧洲) ===
      { rank: 100, name: '哥本哈根大学 (University of Copenhagen)', state: 'Capital Region', city: 'Copenhagen', website: 'https://www.ku.dk', region: '欧洲' },

      # === 🇷🇺 Russia (欧洲) ===
      { rank: 94, name: '莫斯科国立大学 (Lomonosov Moscow State University)', state: 'Moscow', city: 'Moscow', website: 'https://www.msu.ru', region: '欧洲' },

      # === 🇦🇺 Australia (澳洲) ===
      { rank: 13, name: '墨尔本大学 (The University of Melbourne)', state: 'VIC', city: 'Melbourne', website: 'https://www.unimelb.edu.au', region: '澳洲' },
      { rank: 18, name: '悉尼大学 (The University of Sydney)', state: 'NSW', city: 'Sydney', website: 'https://www.sydney.edu.au', region: '澳洲' },
      { rank: 19, name: '新南威尔士大学 (University of New South Wales)', state: 'NSW', city: 'Sydney', website: 'https://www.unsw.edu.au', region: '澳洲' },
      { rank: 30, name: '澳大利亚国立大学 (Australian National University)', state: 'ACT', city: 'Canberra', website: 'https://www.anu.edu.au', region: '澳洲' },
      { rank: 37, name: '蒙纳士大学 (Monash University)', state: 'VIC', city: 'Melbourne', website: 'https://www.monash.edu', region: '澳洲' },
      { rank: 40, name: '昆士兰大学 (The University of Queensland)', state: 'QLD', city: 'Brisbane', website: 'https://www.uq.edu.au', region: '澳洲' },
      { rank: 77, name: '西澳大学 (The University of Western Australia)', state: 'WA', city: 'Perth', website: 'https://www.uwa.edu.au', region: '澳洲' },
      { rank: 82, name: '阿德莱德大学 (The University of Adelaide)', state: 'SA', city: 'Adelaide', website: 'https://www.adelaide.edu.au', region: '澳洲' },
      { rank: 88, name: '悉尼科技大学 (University of Technology Sydney)', state: 'NSW', city: 'Sydney', website: 'https://www.uts.edu.au', region: '澳洲' },

      # === 🇳🇿 New Zealand (澳洲) ===
      { rank: 65, name: '奥克兰大学 (The University of Auckland)', state: 'Auckland', city: 'Auckland', website: 'https://www.auckland.ac.nz', region: '澳洲' },

      # === 🇭🇰 Hong Kong (香港) ===
      { rank: 17, name: '香港大学 (The University of Hong Kong)', state: '香港', city: '香港', website: 'https://www.hku.hk', region: '香港' },
      { rank: 36, name: '香港中文大学 (The Chinese University of Hong Kong)', state: '香港', city: '香港', website: 'https://www.cuhk.edu.hk', region: '香港' },
      { rank: 47, name: '香港科技大学 (The Hong Kong University of Science and Technology)', state: '香港', city: '香港', website: 'https://www.hkust.edu.hk', region: '香港' },
      { rank: 57, name: '香港理工大学 (The Hong Kong Polytechnic University)', state: '香港', city: '香港', website: 'https://www.polyu.edu.hk', region: '香港' },
      { rank: 62, name: '香港城市大学 (City University of Hong Kong)', state: '香港', city: '香港', website: 'https://www.cityu.edu.hk', region: '香港' },

      # === 🇹🇼 Taiwan (台湾) ===
      { rank: 68, name: '国立台湾大学 (National Taiwan University)', state: '台湾', city: '台北', website: 'https://www.ntu.edu.tw', region: '台湾' },

      # === 🇸🇬 Singapore (亚洲) ===
      { rank: 8,  name: '新加坡国立大学 (National University of Singapore)', state: 'Singapore', city: 'Singapore', website: 'https://www.nus.edu.sg', region: '亚洲' },
      { rank: 15, name: '南洋理工大学 (Nanyang Technological University)', state: 'Singapore', city: 'Singapore', website: 'https://www.ntu.edu.sg', region: '亚洲' },

      # === 🇨🇳 China Mainland (亚洲) ===
      { rank: 14, name: '北京大学 (Peking University)', state: '北京', city: '北京', website: 'https://www.pku.edu.cn', region: '亚洲' },
      { rank: 20, name: '清华大学 (Tsinghua University)', state: '北京', city: '北京', website: 'https://www.tsinghua.edu.cn', region: '亚洲' },
      { rank: 39, name: '复旦大学 (Fudan University)', state: '上海', city: '上海', website: 'https://www.fudan.edu.cn', region: '亚洲' },
      { rank: 45, name: '上海交通大学 (Shanghai Jiao Tong University)', state: '上海', city: '上海', website: 'https://www.sjtu.edu.cn', region: '亚洲' },
      { rank: 47, name: '浙江大学 (Zhejiang University)', state: '浙江', city: '杭州', website: 'https://www.zju.edu.cn', region: '亚洲' },

      # === 🇯🇵 Japan (亚洲) ===
      { rank: 32, name: '东京大学 (The University of Tokyo)', state: 'Tokyo', city: 'Tokyo', website: 'https://www.u-tokyo.ac.jp', region: '亚洲' },
      { rank: 50, name: '京都大学 (Kyoto University)', state: 'Kyoto', city: 'Kyoto', website: 'https://www.kyoto-u.ac.jp', region: '亚洲' },
      { rank: 84, name: '东京工业大学 (Tokyo Institute of Technology)', state: 'Tokyo', city: 'Tokyo', website: 'https://www.titech.ac.jp', region: '亚洲' },
      { rank: 86, name: '大阪大学 (Osaka University)', state: 'Osaka', city: 'Osaka', website: 'https://www.osaka-u.ac.jp', region: '亚洲' },

      # === 🇰🇷 South Korea (亚洲) ===
      { rank: 31, name: '首尔国立大学 (Seoul National University)', state: 'Seoul', city: 'Seoul', website: 'https://www.snu.ac.kr', region: '亚洲' },
      { rank: 53, name: '韩国科学技术院 (KAIST)', state: 'Daejeon', city: 'Daejeon', website: 'https://www.kaist.ac.kr', region: '亚洲' },
      { rank: 56, name: '延世大学 (Yonsei University)', state: 'Seoul', city: 'Seoul', website: 'https://www.yonsei.ac.kr', region: '亚洲' },
      { rank: 67, name: '高丽大学 (Korea University)', state: 'Seoul', city: 'Seoul', website: 'https://www.korea.ac.kr', region: '亚洲' },
      { rank: 98, name: '浦项科技大学 (POSTECH)', state: 'Gyeongbuk', city: 'Pohang', website: 'https://www.postech.ac.kr', region: '亚洲' },

      # === 🇲🇾 Malaysia (亚洲) ===
      { rank: 60, name: '马来亚大学 (Universiti Malaya)', state: 'Kuala Lumpur', city: 'Kuala Lumpur', website: 'https://www.um.edu.my', region: '亚洲' },

      # === 🇦🇷 Argentina (南美) ===
      { rank: 71, name: '布宜诺斯艾利斯大学 (Universidad de Buenos Aires)', state: 'Buenos Aires', city: 'Buenos Aires', website: 'https://www.uba.ar', region: '南美' },

      # === 🇧🇷 Brazil (南美) ===
      { rank: 92, name: '圣保罗大学 (Universidade de São Paulo)', state: 'São Paulo', city: 'São Paulo', website: 'https://www.usp.br', region: '南美' },

      # === 🇨🇱 Chile (南美) ===
      { rank: 93, name: '智利天主教大学 (Pontificia Universidad Católica de Chile)', state: 'Santiago', city: 'Santiago', website: 'https://www.uc.cl', region: '南美' },

      # === 🇲🇽 Mexico (北美) ===
      { rank: 94, name: '墨西哥国立自治大学 (Universidad Nacional Autónoma de México)', state: 'Mexico City', city: 'Mexico City', website: 'https://www.unam.mx', region: '北美' },
    ].freeze

    puts "============================================="
    puts "Importing QS #{qs_year} World University Rankings — Top 100"
    puts "Total entries: #{QS_2025_TOP100.length}"
    puts "============================================="

    # Reset all existing QS rankings to avoid stale data
    School.update_all(qs_ranking: nil, qs_year: nil)
    puts "Cleared previous QS rankings."

    created = 0
    updated = 0
    skipped = 0

    QS_2025_TOP100.each do |entry|
      region = regions[entry[:region]]
      unless region
        puts "  ERROR: Region '#{entry[:region]}' not found for #{entry[:name]}"
        skipped += 1
        next
      end

      # Try to find by name first, then by website (to handle naming variations)
      school = School.find_by(name: entry[:name]) || School.find_by(website: entry[:website]) || School.new

      school.assign_attributes(
        name: entry[:name],
        state: entry[:state],
        city: entry[:city],
        website: entry[:website],
        region_id: region.id,
        qs_ranking: entry[:rank],
        qs_year: qs_year
      )

      was_new = !school.persisted?
      ranking_changed = school.qs_ranking_changed? || school.qs_year_changed? || school.region_id_changed?

      if was_new
        created += 1
        action = '🆕'
      elsif ranking_changed
        updated += 1
        action = '📝'
      else
        skipped += 1
        action = nil
      end

      # Save without website uniqueness validation to handle historical duplicates
      school.save!(validate: false)
      printf "  %s QS#%-4d %-55s [%s]\n", action, entry[:rank], entry[:name], entry[:region] if action
    end

    puts ''
    puts "Done! 🆕 Created: #{created}  📝 Updated: #{updated}  ⏭️ Skipped: #{skipped}"
    puts "Total schools with QS #{qs_year} ranking: #{School.where(qs_year: qs_year).count}"

    # Summary by region
    puts ''
    puts '--- By Region ---'
    regions.each do |name, region|
      count = School.where(qs_year: qs_year, region_id: region.id).count
      puts "  #{name}: #{count} schools" if count > 0
    end

    # Verify coverage
    total_in_db = School.where(qs_year: qs_year).count
    puts ''
    if total_in_db >= 100
      puts "✅ Complete: All QS Top 100 universities imported!"
    else
      puts "⚠️  Only #{total_in_db}/100 entries. Some may have been skipped."
    end
  end
end
