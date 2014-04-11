package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.RoleTypeDao;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.RoleType;
import es.lucasgp.cait.tfg.competition.service.api.RoleTypeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleTypeServiceImpl extends BaseServiceImpl<RoleType, String> implements RoleTypeService {

    private final RoleTypeDao roleTypeDao;

    @Autowired
    public RoleTypeServiceImpl(RoleTypeDao roleTypeDao) {
        super(roleTypeDao);
        this.roleTypeDao = roleTypeDao;
    }

    @Override
    public RoleType create(final RoleType roleType) {
        return super.create(roleType);
    }

    @Override
    public RoleType update(final RoleType roleType) {
        return super.update(roleType);
    }

    @Override
    public RoleType findById(final String id) {
        return super.findById(id);
    }

    @Override
    public List<RoleType> findAll() {
        return super.findAll();

    }

    @Override
    public PageResult<RoleType> findAll(PageRequest pageRequest) {
        return super.findAll(pageRequest);
    }

}
